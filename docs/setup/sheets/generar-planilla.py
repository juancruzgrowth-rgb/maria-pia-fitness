#!/usr/bin/env python3
"""
Genera `Pia-Moretto-Base-de-datos.xlsx`: la planilla entera, con las seis
pestañas, los encabezados en su lugar y una hoja de leyenda.

    python3 docs/setup/sheets/generar-planilla.py

Se sube a Google Drive y se abre con Google Sheets (Archivo → Guardar como
hoja de cálculo de Google). Los nombres de las pestañas tienen que quedar
exactamente como salen de acá: los flujos de n8n las buscan por nombre.

Sin dependencias a propósito — sólo la biblioteca estándar. Un .xlsx es un zip
con XML adentro, así que no hace falta instalar nada ni armar un venv para algo
que se corre una vez.

Los encabezados NO se escriben acá: se leen de los .csv de esta misma carpeta,
que son la fuente de verdad. Si cambia una columna, se cambia el CSV y se vuelve
a correr esto.
"""

import csv
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

CARPETA = Path(__file__).parent
SALIDA = CARPETA / "Pia-Moretto-Base-de-datos.xlsx"

# El orden es el de lectura, no el alfabético: primero por dónde entra la gente.
# El nombre del archivo CSV puede diferir del nombre de la pestaña (skool-miembros
# contra skool_miembros): manda el segundo, que es el que buscan los flujos.
PESTANAS = [
    ("leads", "leads"),
    ("ventas", "ventas"),
    ("comunidad", "comunidad"),
    ("contenido", "contenido"),
    ("bajas", "bajas"),
    ("skool_miembros", "skool-miembros"),
]

LEYENDA = [
    ["Pestaña", "Para qué es", "Quién la llena"],
    ["leads", "Gente que mostró interés y todavía no pagó", "n8n"],
    ["ventas", "Una fila por compra. De acá sale todo lo demás", "La web y el webhook de MercadoPago"],
    ["comunidad", "Cómo va cada alumna adentro del reto", "n8n"],
    ["contenido", "Qué se publicó y qué trajo", "A mano (Daiana)"],
    ["bajas", "Pedidos de cancelación. Res. 424/2020: se resuelven en 24 h", "La página /cancelar"],
    ["skool_miembros", "La foto de quién está adentro de Skool. Se pega a mano una vez por semana", "A mano"],
    ["", "", ""],
    ["Valores que usa la automatización", "", ""],
    ["ventas · plan", "nivel-mensual · trimestral", ""],
    ["ventas · estado", "pendiente · pagado · cobro_rechazado · cancelado", ""],
    ["ventas · estado_suscripcion", "authorized · paused · cancelled (vacío en el trimestral)", ""],
    ["ventas · acceso_skool", "no · invitada · sí", ""],
    ["ventas · avisos", "rechazo-visto:FECHA · rechazo-avisado · pack-previo · pack-vencido", ""],
    ["comunidad · estado_riesgo", "ok · atención · en riesgo · abandonó", ""],
    ["", "", ""],
    ["No renombres las pestañas ni las columnas.", "Los flujos de n8n las buscan por nombre y dejan de encontrarlas.", ""],
    ["Esta hoja se puede borrar.", "Está sólo para leer. Ninguna automatización la toca.", ""],
]


def encabezados(nombre_csv):
    with open(CARPETA / f"{nombre_csv}.csv", encoding="utf-8") as f:
        return next(csv.reader(f))


def celda(col, fila, texto, estilo):
    ref = f"{columna_a_letra(col)}{fila}"
    return (
        f'<c r="{ref}" s="{estilo}" t="inlineStr">'
        f"<is><t xml:space=\"preserve\">{escape(str(texto))}</t></is></c>"
    )


def columna_a_letra(n):
    letra = ""
    while n > 0:
        n, resto = divmod(n - 1, 26)
        letra = chr(65 + resto) + letra
    return letra


def hoja_xml(filas, estilo_primera_fila):
    """Una hoja con la fila 1 congelada. Las hojas de datos llevan sólo esa fila."""
    ancho = max((len(f) for f in filas), default=1)
    cols = f'<cols><col min="1" max="{ancho}" width="22" customWidth="1"/></cols>'
    cuerpo = []
    for i, fila in enumerate(filas, start=1):
        estilo = estilo_primera_fila if i == 1 else 0
        celdas = "".join(celda(j, i, v, estilo) for j, v in enumerate(fila, start=1) if v != "")
        cuerpo.append(f'<row r="{i}">{celdas}</row>')
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<sheetViews><sheetView workbookViewId="0">'
        '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>'
        "</sheetView></sheetViews>"
        f"{cols}<sheetData>{''.join(cuerpo)}</sheetData></worksheet>"
    )


ESTILOS = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
    '<fonts count="2">'
    '<font><sz val="11"/><name val="Calibri"/></font>'
    '<font><b/><sz val="11"/><color rgb="FF050505"/><name val="Calibri"/></font>'
    "</fonts>"
    '<fills count="3">'
    '<fill><patternFill patternType="none"/></fill>'
    '<fill><patternFill patternType="gray125"/></fill>'
    '<fill><patternFill patternType="solid"><fgColor rgb="FFEAA959"/><bgColor indexed="64"/></patternFill></fill>'
    "</fills>"
    '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
    '<cellXfs count="2">'
    '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
    '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>'
    "</cellXfs></styleSheet>"
)


def main():
    hojas = [(nombre, [encabezados(csv_)], 1) for nombre, csv_ in PESTANAS]
    hojas.append(("_leyenda", LEYENDA, 1))

    entradas = [
        f'<sheet name="{escape(n)}" sheetId="{i}" r:id="rId{i}"/>'
        for i, (n, _, _) in enumerate(hojas, start=1)
    ]
    workbook = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"'
        ' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f"<sheets>{''.join(entradas)}</sheets></workbook>"
    )

    rels = [
        f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>'
        for i in range(1, len(hojas) + 1)
    ]
    rels.append(
        f'<Relationship Id="rId{len(hojas) + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    )

    overrides = [
        f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        for i in range(1, len(hojas) + 1)
    ]

    with zipfile.ZipFile(SALIDA, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr(
            "[Content_Types].xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
            '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
            f"{''.join(overrides)}</Types>",
        )
        z.writestr(
            "_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
            "</Relationships>",
        )
        z.writestr("xl/workbook.xml", workbook)
        z.writestr(
            "xl/_rels/workbook.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f"{''.join(rels)}</Relationships>",
        )
        z.writestr("xl/styles.xml", ESTILOS)
        for i, (_, filas, estilo) in enumerate(hojas, start=1):
            z.writestr(f"xl/worksheets/sheet{i}.xml", hoja_xml(filas, estilo))

    print(f"Listo: {SALIDA}")
    for nombre, filas, _ in hojas:
        print(f"  {nombre:<16} {len(filas[0])} columnas")


if __name__ == "__main__":
    main()

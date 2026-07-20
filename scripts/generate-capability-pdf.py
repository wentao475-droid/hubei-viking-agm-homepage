#!/usr/bin/env python3
from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "viking-agm-technical-capability.pdf"
PUBLIC = ROOT / "public" / "downloads" / "viking-agm-technical-capability.pdf"
FONT_PATH = Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf")

INK = colors.HexColor("#172033")
GRAPHITE = colors.HexColor("#263241")
STEEL = colors.HexColor("#5B6877")
LINE = colors.HexColor("#D9E1EA")
FROST = colors.HexColor("#F5F7FA")
SIGNAL = colors.HexColor("#0E6EB8")
COPPER = colors.HexColor("#B7791F")
WHITE = colors.white


def register_fonts():
    pdfmetrics.registerFont(TTFont("VikingSans", str(FONT_PATH)))


def image(path, width, height):
    item = Image(str(ROOT / path), width=width, height=height)
    item.hAlign = "CENTER"
    return item


def fit_image(path, max_width, max_height):
    item = Image(str(ROOT / path))
    ratio = min(max_width / item.imageWidth, max_height / item.imageHeight)
    item.drawWidth = item.imageWidth * ratio
    item.drawHeight = item.imageHeight * ratio
    item.hAlign = "CENTER"
    return item


def header_footer(canvas, doc):
    canvas.saveState()
    page = canvas.getPageNumber()
    if page > 1:
        canvas.setFillColor(INK)
        canvas.rect(0, A4[1] - 15 * mm, A4[0], 15 * mm, stroke=0, fill=1)
        canvas.setFont("VikingSans", 8.5)
        canvas.setFillColor(WHITE)
        canvas.drawString(18 * mm, A4[1] - 9.6 * mm, "VIKING AGM  |  TECHNICAL CAPABILITY")
        canvas.setFillColor(STEEL)
        canvas.setFont("VikingSans", 8)
        canvas.drawString(18 * mm, 10 * mm, "www.vikingagm.com  |  vikingsales@vikingagm.com  |  +86 18171518528")
        canvas.drawRightString(A4[0] - 18 * mm, 10 * mm, str(page))
        canvas.setStrokeColor(LINE)
        canvas.line(18 * mm, 14 * mm, A4[0] - 18 * mm, 14 * mm)
    canvas.restoreState()


def build_styles():
    styles = getSampleStyleSheet()
    return {
        "eyebrow": ParagraphStyle(
            "eyebrow",
            parent=styles["Normal"],
            fontName="VikingSans",
            fontSize=9,
            leading=12,
            textColor=SIGNAL,
            spaceAfter=5 * mm,
        ),
        "title": ParagraphStyle(
            "title",
            parent=styles["Title"],
            fontName="VikingSans",
            fontSize=25,
            leading=32,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=6 * mm,
        ),
        "subtitle": ParagraphStyle(
            "subtitle",
            parent=styles["Normal"],
            fontName="VikingSans",
            fontSize=11,
            leading=18,
            textColor=GRAPHITE,
            spaceAfter=5 * mm,
        ),
        "heading": ParagraphStyle(
            "heading",
            parent=styles["Heading2"],
            fontName="VikingSans",
            fontSize=16,
            leading=21,
            textColor=INK,
            spaceAfter=3 * mm,
        ),
        "body": ParagraphStyle(
            "body",
            parent=styles["BodyText"],
            fontName="VikingSans",
            fontSize=9.5,
            leading=16,
            textColor=GRAPHITE,
            spaceAfter=3 * mm,
        ),
        "small": ParagraphStyle(
            "small",
            parent=styles["BodyText"],
            fontName="VikingSans",
            fontSize=8,
            leading=13,
            textColor=STEEL,
        ),
        "card_title": ParagraphStyle(
            "card_title",
            parent=styles["Heading3"],
            fontName="VikingSans",
            fontSize=11,
            leading=15,
            textColor=INK,
            spaceAfter=2 * mm,
        ),
        "card_body": ParagraphStyle(
            "card_body",
            parent=styles["BodyText"],
            fontName="VikingSans",
            fontSize=8.5,
            leading=14,
            textColor=STEEL,
        ),
        "cover_title": ParagraphStyle(
            "cover_title",
            parent=styles["Title"],
            fontName="VikingSans",
            fontSize=30,
            leading=38,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=5 * mm,
        ),
        "cover_subtitle": ParagraphStyle(
            "cover_subtitle",
            parent=styles["Normal"],
            fontName="VikingSans",
            fontSize=13,
            leading=21,
            textColor=GRAPHITE,
            alignment=TA_CENTER,
        ),
    }


def section_header(styles, eyebrow, title, text=None):
    items = [
        Paragraph(eyebrow.upper(), styles["eyebrow"]),
        Paragraph(title, styles["title"]),
    ]
    if text:
        items.append(Paragraph(text, styles["subtitle"]))
    return items


def bullet_cards(styles, entries, columns=2):
    cells = []
    for title, text in entries:
        cells.append(
            Table(
                [[Paragraph(title, styles["card_title"])], [Paragraph(text, styles["card_body"])]],
                colWidths=[78 * mm if columns == 2 else 51 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), FROST),
                        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                        ("TOPPADDING", (0, 0), (-1, -1), 3.5 * mm),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5 * mm),
                    ]
                ),
            )
        )
    rows = [cells[index:index + columns] for index in range(0, len(cells), columns)]
    if len(rows[-1]) < columns:
        rows[-1].extend([""] * (columns - len(rows[-1])))
    widths = [82 * mm] * columns if columns == 2 else [54 * mm] * columns
    return Table(
        rows,
        colWidths=widths,
        hAlign="LEFT",
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ]
        ),
    )


def build_pdf():
    register_fonts()
    styles = build_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=22 * mm,
        bottomMargin=18 * mm,
        title="Viking AGM Technical Capability",
        author="Hubei Viking Technology Co., Ltd.",
        subject="AGM separator rolls, sheets, quality checks, packing and sample discussion",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="main",
    )
    doc.addPageTemplates([PageTemplate(id="content", frames=frame, onPage=header_footer)])

    story = []

    story.extend(
        [
            Spacer(1, 8 * mm),
            fit_image("public/images/banner-logo-header.webp", 115 * mm, 32 * mm),
            Spacer(1, 8 * mm),
            fit_image("public/images/agm-hero-production-1600.webp", 174 * mm, 82 * mm),
            Spacer(1, 11 * mm),
            Paragraph("AGM Separator Technical Capability", styles["cover_title"]),
            Paragraph("AGM 隔板技术能力概览", styles["cover_title"]),
            Spacer(1, 3 * mm),
            Paragraph(
                "Rolls, sheets, application review, quality checks and packing discussion<br/>"
                "卷材、片材、应用评审、质量检查与包装沟通",
                styles["cover_subtitle"],
            ),
            Spacer(1, 11 * mm),
            Table(
                [[Paragraph("Hubei Viking Technology Co., Ltd.  |  湖北维京科技有限公司", styles["small"])]],
                colWidths=[174 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), FROST),
                        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
                    ]
                ),
            ),
            PageBreak(),
        ]
    )

    story.extend(
        section_header(
            styles,
            "01 / Product Forms",
            "AGM separator rolls and sheets / AGM 隔板卷材与片材",
            "Product form should match the battery design and production workflow. "
            "产品形式应结合电池设计与生产流程共同确认。",
        )
    )
    forms = Table(
        [
            [
                [
                    fit_image("public/images/viking-finished-separator-roll-900.webp", 78 * mm, 50 * mm),
                    Spacer(1, 3 * mm),
                    Paragraph("AGM Separator Rolls / AGM 隔板卷材", styles["heading"]),
                    Paragraph(
                        "For continuous production, converting or in-house cutting. "
                        "Width, thickness, roll length, core and packing can be discussed.<br/>"
                        "适用于连续生产、分切或厂内裁切，可沟通宽度、厚度、卷长、芯管与包装。",
                        styles["body"],
                    ),
                ],
                [
                    fit_image("public/images/viking-separator-sheets-900.webp", 78 * mm, 50 * mm),
                    Spacer(1, 3 * mm),
                    Paragraph("AGM Separator Sheets / AGM 隔板片材", styles["heading"]),
                    Paragraph(
                        "Pre-cut format for direct assembly, sample review and battery-model discussion. "
                        "Sheet height, width, thickness and packing quantity should be confirmed.<br/>"
                        "预裁切形式适用于直接装配、样品评审和电池型号沟通，应确认片材长宽、厚度与包装数量。",
                        styles["body"],
                    ),
                ],
            ]
        ],
        colWidths=[85 * mm, 85 * mm],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, -1), 5 * mm),
                ("LEFTPADDING", (1, 0), (1, -1), 5 * mm),
                ("RIGHTPADDING", (1, 0), (1, -1), 0),
            ]
        ),
    )
    story.extend(
        [
            forms,
            Spacer(1, 4 * mm),
            Table(
                [
                    [
                        Paragraph(
                            "<b>Applications / 应用</b><br/>"
                            "VRLA, UPS, motorcycle, automotive and energy storage lead-acid batteries. "
                            "具体隔板要求应结合电池设计、装配方式和应用场景确认。",
                            styles["body"],
                        )
                    ]
                ],
                colWidths=[174 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), FROST),
                        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
                    ]
                ),
            ),
            PageBreak(),
        ]
    )

    story.extend(
        section_header(
            styles,
            "02 / Specification Review",
            "Information for sample and specification matching / 样品与规格匹配信息",
            "Not every parameter needs to be final at first contact. Share what is available and mark the points still under review. "
            "首次联系不需要确定所有参数，可先提供已有信息并标注待确认项目。",
        )
    )
    story.extend(
        [
            fit_image("public/images/evidence/agm-separator-roll-end-face-01.webp", 174 * mm, 68 * mm),
            Spacer(1, 7 * mm),
            bullet_cards(
                styles,
                [
                    ("1. Battery application / 电池应用", "VRLA, UPS, motorcycle, automotive, energy storage or another lead-acid battery application."),
                    ("2. Product form / 产品形式", "Roll material, pre-cut sheets or a request to compare both formats."),
                    ("3. Dimensions / 尺寸", "Target thickness, roll width, sheet height and width, drawing or existing sample."),
                    ("4. Technical reference / 技术参考", "Target values, customer standards, agreed test items or reference material."),
                    ("5. Quantity plan / 数量计划", "Sample, trial or production planning information when available."),
                    ("6. Packing / 包装", "Roll core, sheet quantity, labels, pallet or other delivery requirements."),
                ],
            ),
            PageBreak(),
        ]
    )

    story.extend(
        section_header(
            styles,
            "03 / Quality Review",
            "Quality checks should follow the agreed application / 检测项目应结合应用要求",
            "Appearance and measurable parameters should be reviewed together. Final test items and target values should be confirmed with the customer. "
            "外观与可测量参数应结合评审，最终检测项目和目标值应与客户确认。",
        )
    )
    story.extend(
        [
            fit_image("public/images/agm-quality-control-1200.webp", 174 * mm, 76 * mm),
            Spacer(1, 7 * mm),
            bullet_cards(
                styles,
                [
                    ("Thickness / 厚度", "Review thickness direction and consistency according to battery design and assembly requirements."),
                    ("Basis weight / 克重", "Discuss material basis-weight requirements and batch comparison needs."),
                    ("Acid absorption / 吸酸相关表现", "Confirm the agreed absorption-related test method and target direction."),
                    ("Electrical resistance / 电阻", "Review the test requirement together with the battery application."),
                    ("Appearance / 外观", "Check surface condition, edges, visible defects and roll or sheet handling quality."),
                    ("Customer-specific items / 客户特定项目", "Additional checks can be discussed before sample or order arrangement."),
                ],
            ),
            PageBreak(),
        ]
    )

    story.extend(
        section_header(
            styles,
            "04 / Packing and Delivery",
            "Prepare packing details before the order rhythm increases / 提前确认包装与交付细节",
            "Roll, sheet, label and pallet requirements affect receiving, storage and production handling. "
            "卷材、片材、标签和托盘要求会影响收货、仓储和生产使用。",
        )
    )
    delivery_table = Table(
        [
            [
                fit_image("public/images/evidence/agm-separator-roll-warehouse-01.webp", 82 * mm, 62 * mm),
                fit_image("public/images/evidence/shipping-pallet-01.webp", 82 * mm, 62 * mm),
            ],
            [
                Paragraph("Roll storage and batch preparation / 卷材仓储与批次准备", styles["small"]),
                Paragraph("Pallet packing and delivery preparation / 托盘包装与交付准备", styles["small"]),
            ],
        ],
        colWidths=[85 * mm, 85 * mm],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ]
        ),
    )
    story.extend(
        [
            delivery_table,
            Spacer(1, 5 * mm),
            bullet_cards(
                styles,
                [
                    ("Roll details / 卷材细节", "Confirm roll width, length, core and protective wrapping requirements."),
                    ("Sheet details / 片材细节", "Confirm sheet dimensions, packing quantity and handling expectations."),
                    ("Labels / 标签", "Discuss product identification, batch information and customer label requirements."),
                    ("Pallet and shipping / 托盘与运输", "Review pallet, outer protection and delivery-document requirements."),
                ],
            ),
            Spacer(1, 7 * mm),
            Table(
                [
                    [
                        Paragraph(
                            "<b>Supply coordination / 供货协同</b><br/>"
                            "Stable delivery depends on clear specification confirmation, batch communication and timely handling of changes. "
                            "稳定交付依赖清晰的规格确认、批次沟通及变更处理。",
                            styles["body"],
                        )
                    ]
                ],
                colWidths=[174 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), FROST),
                        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
                    ]
                ),
            ),
            PageBreak(),
        ]
    )

    story.extend(
        section_header(
            styles,
            "05 / Start a Discussion",
            "Request a sample and specification match / 申请样品与规格匹配",
            "Send the information you already have. Viking AGM can review the application, product form and specification direction before discussing the suitable next step. "
            "发送您已经掌握的信息，湖北维京可在下一步沟通前评审应用、产品形式和规格方向。",
        )
    )
    story.extend(
        [
            fit_image("public/images/viking-company-building-900.webp", 174 * mm, 50 * mm),
            Spacer(1, 4 * mm),
            bullet_cards(
                styles,
                [
                    ("Step 1 / 第一步", "Share the battery application, roll or sheet preference and available dimensions."),
                    ("Step 2 / 第二步", "Confirm missing specification, sample, testing and packing information."),
                    ("Step 3 / 第三步", "Discuss a suitable sample, technical review or quotation path."),
                ],
                columns=3,
            ),
            Spacer(1, 4 * mm),
            Table(
                [
                    [Paragraph("Hubei Viking Technology Co., Ltd.<br/>湖北维京科技有限公司", styles["heading"])],
                    [Paragraph("<b>Email</b>  vikingsales@vikingagm.com", styles["body"])],
                    [Paragraph("<b>Telephone</b>  +86 18171518528", styles["body"])],
                    [Paragraph("<b>Website</b>  https://www.vikingagm.com", styles["body"])],
                ],
                colWidths=[174 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, 0), INK),
                        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                        ("BACKGROUND", (0, 1), (-1, -1), FROST),
                        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                        ("INNERGRID", (0, 1), (-1, -1), 0.4, LINE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
                        ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
                    ]
                ),
            ),
            Spacer(1, 6 * mm),
            Paragraph(
                "This document is a capability and communication reference. Final product specifications, test items, sample arrangements, packing and commercial terms are subject to mutual confirmation.<br/>"
                "本资料用于能力与沟通参考。最终产品规格、检测项目、样品安排、包装及商务条款以双方确认为准。",
                styles["small"],
            ),
        ]
    )

    doc.build(story)
    copyfile(OUTPUT, PUBLIC)
    print(f"Wrote {OUTPUT}")
    print(f"Wrote {PUBLIC}")


if __name__ == "__main__":
    build_pdf()

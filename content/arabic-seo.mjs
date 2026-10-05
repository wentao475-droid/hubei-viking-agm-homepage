const arabicSeoTitles = {
    "/": "شركة تصنيع فواصل AGM لبطاريات VRLA | Viking AGM",
    "/request-agm-separator-sample/": "طلب عينة فاصل AGM ومراجعة المواصفات | Viking AGM",
    "/products/agm-separator/": "فاصل AGM من الألياف الزجاجية لبطاريات VRLA | Viking AGM",
    "/products/agm-separator-rolls/": "لفائف فواصل AGM لبطاريات VRLA | Viking AGM",
    "/products/agm-separator-sheets/": "ألواح فواصل AGM لبطاريات VRLA | Viking AGM",
    "/products/glass-fiber-thermal-insulation-paper/": "ورق عزل حراري من الألياف الزجاجية | Viking AGM",
    "/quality-control/agm-separator-testing/": "اختبار جودة فواصل AGM | Viking AGM",
    "/applications/agm-separator-for-vrla-battery/": "فواصل AGM لبطاريات VRLA | Viking AGM",
    "/applications/agm-separator-for-ups-battery/": "فواصل AGM لبطاريات UPS VRLA | Viking AGM",
    "/applications/agm-separator-for-motorcycle-battery/": "فواصل AGM لبطاريات الدراجات النارية | Viking AGM",
    "/applications/agm-separator-for-energy-storage-battery/": "فواصل AGM لبطاريات تخزين الطاقة | Viking AGM"
};
export function buildArabicPageSeo(fallback) {
    const sourcePath = fallback.path;
    const pageName = (arabicSeoTitles[sourcePath] ?? "فواصل AGM").split(" | ")[0];
    const descriptions = {
        "/": "تعرف على تصنيع فواصل AGM من الألياف الزجاجية لدى Viking ومناقشة اللفائف والألواح والعينات ومتطلبات بطاريات VRLA.",
        "/request-agm-separator-sample/": "أرسل تطبيق البطارية وأبعاد الفاصل وشروط القياس والتعبئة لبدء مراجعة عينة AGM ومطابقة المواصفات.",
        "/products/agm-separator/": "راجع وظيفة فاصل AGM في بطاريات VRLA وخصائص الامتصاص والسماكة والضغط وأشكال التوريد قبل اختيار العينة.",
        "/products/agm-separator-rolls/": "ناقش عرض لفائف AGM والقلب والقطر وحالة الحواف والتعبئة وفق التغذية والتقطيع في مصنع البطاريات.",
        "/products/agm-separator-sheets/": "ألواح AGM مقطوعة وفق أبعاد متفق عليها؛ راجع السماكة والحواف والاتجاه والتعبئة لمطابقة عملية التجميع.",
        "/quality-control/agm-separator-testing/": "تأكيد طرق قياس سماكة AGM تحت الضغط والكتلة السطحية والامتصاص والمقاومة والأبعاد مع متطلبات قبول الدفعات.",
        "/applications/agm-separator-for-vrla-battery/": "مطابقة فواصل AGM مع بنية بطاريات VRLA وكمية الإلكتروليت وضغط مجموعة الألواح وخطة تحقق البطارية.",
        "/applications/agm-separator-for-ups-battery/": "راجع فواصل AGM لبطاريات UPS والطاقة الاحتياطية مع شروط الحمل والتجميع والفحص والتحقق من البطارية الكاملة.",
        "/applications/agm-separator-for-motorcycle-battery/": "اختيار لفائف وألواح AGM لبطاريات بدء تشغيل الدراجات النارية وفق أبعاد الألواح وتجميع البطارية والعينات.",
        "/applications/agm-separator-for-energy-storage-battery/": "ناقش فواصل AGM لبطاريات تخزين الطاقة الرصاصية مع ظروف الدورات والضغط والامتصاص واتساق الدفعات."
    };
    const description = descriptions[sourcePath] ?? pageName;
    return {
        ...fallback,
        path: sourcePath === "/" ? "/ar/" : `/ar${sourcePath}`,
        alternatePath: sourcePath,
        locale: "ar_AR",
        language: "ar",
        siteName: "Viking AGM",
        alternateSiteName: "Hubei Viking AGM",
        title: arabicSeoTitles[sourcePath] ?? "فواصل AGM لبطاريات الرصاص الحمضية | Viking AGM",
        description,
        keywords: [pageName, "فواصل AGM", "بطاريات VRLA", "Viking AGM"],
        breadcrumbs: sourcePath === "/" ? ["الرئيسية"] : ["الرئيسية", pageName],
        pageName,
        productName: arabicSeoTitles[sourcePath] ?? "فاصل AGM",
        serviceName: "تصنيع فواصل AGM من الألياف الزجاجية",
        serviceDescription: "فواصل AGM على شكل لفائف وألواح لمصنعي بطاريات الرصاص الحمضية."
    };
}

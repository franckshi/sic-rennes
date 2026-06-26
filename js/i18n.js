(function () {
  const supported = ["zh", "fr", "en"];
  const saved = localStorage.getItem("sic_language");
  const language = supported.includes(saved) ? saved : "fr";
  const locales = { zh: "zh-CN", fr: "fr-FR", en: "en-GB" };

  const messages = {
    zh: {
      "Aller au contenu": "跳转到主要内容",
      "SIC à Rennes — 雷恩中文国际班": "雷恩中文国际班 — SIC à Rennes",
      "Le parcours — SIC à Rennes": "课程体系 — 雷恩中文国际班",
      "Les pôles — SIC à Rennes": "校区 — 雷恩中文国际班",
      "L’équipe — SIC à Rennes": "教学团队 — 雷恩中文国际班",
      "Projets des élèves — SIC à Rennes": "学生项目 — 雷恩中文国际班",
      "Agenda — SIC à Rennes": "日程 — 雷恩中文国际班",
      "Pôle lycée — SIC à Rennes": "高中部 — 雷恩中文国际班",
      "Accueil — SIC à Rennes": "首页 — 雷恩中文国际班",
      "Navigation principale": "主导航",
      "Language": "语言",
      "Accueil": "首页",
      "Le parcours": "课程体系",
      "Les pôles": "校区",
      "Agenda": "日程",
      "Projets": "学生项目",
      "L’équipe": "教学团队",
      "Découvrir la SIC": "了解国际班",
      "Ouvrir le menu": "打开菜单",
      "Le portail de la Section internationale chinoise : parcours, projets, équipe et informations pratiques.": "雷恩中文国际班平台：集中介绍课程体系、学生项目、教学团队和实用信息。",
      "Découvrir": "了解我们",
      "Les pôles SIC": "国际班校区",
      "Vie de la SIC": "国际班生活",
      "Projets des élèves": "学生项目",
      "Préparer son entrée": "申请准备",
      "Plateforme": "平台",
      "Administration": "后台管理",
      "Contact": "联系我们",
      "Mentions légales": "法律声明",
      "Un parcours bilingue du collège au baccalauréat,": "从初中到高中毕业的双语课程，",
      "Un parcours bilingue du CE2 au baccalauréat,": "从小学 CE2 到高中毕业的双语课程，",
      "pour apprendre, comprendre et grandir entre deux cultures.": "在两种文化之间学习、理解与成长。",
      "Voir les deux pôles": "查看两个校区",
      "Voir les sept pôles": "查看七个教学点",
      "Explorer les projets": "浏览学生项目",
      "Chiffres clés": "关键数据",
      "pôles collège et lycée": "初中部与高中部",
      "établissements SIC à Rennes": "所雷恩 SIC 学校",
      "années de parcours continu": "年连续课程",
      "langues au quotidien": "种日常使用语言",
      "volets du parcours expliqués": "个课程模块",
      "projets à découvrir": "个学生项目",
      "Grandir dans un parcours international": "在国际课程中成长",
      "Une progression continue qui articule langue, culture, disciplines et projets collectifs.": "将语言、文化、学科与集体项目融为一体的连续培养体系。",
      "Entrer dans le parcours et construire ses repères.": "进入课程体系，建立学习基础。",
      "Lire, écouter et s’exprimer avec plus d’aisance.": "提升阅读、听力和表达能力。",
      "Développer l’analyse et les projets bilingues.": "发展分析能力并参与双语项目。",
      "Développer l’analyse, la littérature et les mathématiques en chinois.": "通过中文发展分析能力、文学学习和数学学习。",
      "Consolider les acquis et préparer la suite.": "巩固所学，为下一阶段做好准备。",
      "Consolider les acquis et préparer le cycle terminal.": "巩固所学，为高中后两年做好准备。",
      "Lycée": "高中",
      "Approfondir la langue, la culture et les disciplines.": "深入学习语言、文化与学科内容。",
      "Après-bac": "高中毕业后",
      "Valoriser un profil bilingue et international.": "发挥双语和国际化背景的优势。",
      "Les deux pôles de la SIC": "国际班的两个校区",
      "Les sept pôles de la SIC": "国际班的七个教学点",
      "Découvrir le parcours →": "了解课程体系 →",
      "Agenda prévisionnel": "近期日程",
      "Consulter l’agenda →": "查看全部日程 →",
      "Voir tous les projets →": "查看全部项目 →",
      "Découvrez la continuité du parcours entre le collège et le lycée, ainsi que les équipes et enseignements associés.": "了解从初中到高中的连续培养路径，以及相关教学团队和课程。",
      "Découvrez les sept établissements SIC à Rennes, de l’école primaire au lycée.": "了解雷恩从小学到高中的七所 SIC 学校。",
      "Tous": "全部",
      "École primaire": "小学",
      "Collège": "初中",
      "Rechercher un pôle": "搜索校区",
      "Aucun pôle ne correspond à cette recherche.": "没有符合搜索条件的校区。",
      "Établissement introuvable": "未找到该校区",
      "Présentation": "简介",
      "Volets du parcours": "课程模块",
      "Les informations détaillées seront ajoutées prochainement.": "详细信息即将发布。",
      "Équipe enseignante": "教学团队",
      "La présentation de l’équipe sera publiée après validation.": "团队介绍将在确认后发布。",
      "Localisation": "地址",
      "Type": "类型",
      "Adresse": "地址",
      "Parcours": "课程",
      "Section internationale chinoise": "中文国际班",
      "Volets": "模块",
      "À confirmer": "待确认",
      "Visiter le site officiel": "访问官方网站",
      "Le parcours SIC": "中文国际班课程体系",
      "Comprendre la progression du collège au lycée, les apprentissages renforcés et la préparation de son entrée dans la section.": "了解从初中到高中的学习进阶、强化课程和入班准备。",
      "Comprendre la progression du primaire au lycée, les apprentissages renforcés et la préparation de son entrée dans la section.": "了解从小学到高中的学习进阶、强化课程和入班准备。",
      "Voir le parcours →": "查看课程 →",
      "Programme introuvable": "未找到该课程",
      "À qui s’adresse ce parcours ?": "课程适合谁？",
      "Principaux avantages": "主要优势",
      "Organisation 2026-2027": "2026-2027 学年组织图",
      "D’après l’arbre fourni : deux groupes d’écoles primaires alimentent deux collèges SIC, puis les deux collèges poursuivent vers le lycée Émile Zola.": "根据提供的树状图：两个小学组分别升入两个 SIC 初中，之后两个初中都升入埃米尔·左拉高中。",
      "Une progression du primaire au BFI": "从小学到 BFI 的连续培养",
      "Méthodes d’enseignement": "教学方法",
      "Culture et projets": "文化与项目",
      "Source pédagogique": "教学资料来源",
      "Après ce parcours": "课程之后",
      "Où suivre ce volet ?": "在哪里学习？",
      "Les informations pratiques seront ajoutées après validation.": "实用信息将在确认后发布。",
      "Préparer son projet": "准备申请",
      "Découvrez les deux pôles SIC puis confirmez les modalités et dates auprès de l’établissement.": "了解两个国际班校区，并向学校确认申请方式和日期。",
      "Découvrez les sept pôles SIC puis confirmez les modalités et dates auprès de l’établissement.": "了解七个 SIC 教学点，并向学校确认具体方式和日期。",
      "Voir les pôles SIC": "查看国际班校区",
      "Réunions, ateliers, présentations et temps forts de la Section internationale chinoise. Les dates indiquées doivent être confirmées.": "中文国际班的会议、工作坊、介绍会和重要活动。所列日期需进一步确认。",
      "Toutes": "全部",
      "Productions bilingues, ateliers, échanges et projets culturels qui donnent vie au parcours SIC.": "双语作品、工作坊、交流与文化项目，共同构成丰富的国际班学习生活。",
      "Toutes les années": "全部年份",
      "Toutes les catégories": "全部类别",
      "Aucune activité ne correspond à ces filtres.": "没有符合筛选条件的项目。",
      "L’équipe SIC": "国际班教学团队",
      "Les fonctions pédagogiques qui accompagnent les élèves et relient langue, disciplines, projets et familles.": "教学团队陪伴学生成长，并连接语言、学科、项目与家庭。",
      "Cette page n’est pas encore disponible.": "该页面暂未开放。",
      "Revenir à l’accueil": "返回首页",
      "Page introuvable": "页面未找到",
      "Public": "公立",
      "Information": "信息",
      "Rencontre": "交流会",
      "Atelier": "工作坊",
      "Productions d’élèves": "学生作品",
      "Langue et littérature": "语言与文学",
      "Arts": "艺术",
      "Vie de la section": "国际班生活",
      "Échanges": "交流"
    },
    en: {
      "Aller au contenu": "Skip to main content",
      "SIC à Rennes — 雷恩中文国际班": "SIC in Rennes — Chinese International Section",
      "Le parcours — SIC à Rennes": "Programme — SIC in Rennes",
      "Les pôles — SIC à Rennes": "Campuses — SIC in Rennes",
      "L’équipe — SIC à Rennes": "Team — SIC in Rennes",
      "Projets des élèves — SIC à Rennes": "Student projects — SIC in Rennes",
      "Agenda — SIC à Rennes": "Calendar — SIC in Rennes",
      "Pôle lycée — SIC à Rennes": "High School Division — SIC in Rennes",
      "Accueil — SIC à Rennes": "Home — SIC in Rennes",
      "Navigation principale": "Main navigation",
      "Accueil": "Home",
      "Le parcours": "Programme",
      "Les pôles": "Campuses",
      "Agenda": "Calendar",
      "Projets": "Projects",
      "L’équipe": "Team",
      "Découvrir la SIC": "Discover SIC",
      "Ouvrir le menu": "Open menu",
      "Le portail de la Section internationale chinoise : parcours, projets, équipe et informations pratiques.": "The Chinese International Section portal: programme, projects, team and practical information.",
      "Découvrir": "Discover",
      "Les pôles SIC": "SIC campuses",
      "Vie de la SIC": "SIC life",
      "Projets des élèves": "Student projects",
      "Préparer son entrée": "Prepare your application",
      "Plateforme": "Platform",
      "Administration": "Administration",
      "Contact": "Contact",
      "Mentions légales": "Legal notice",
      "Un parcours bilingue du collège au baccalauréat,": "A bilingual programme from middle school to the baccalaureate,",
      "Un parcours bilingue du CE2 au baccalauréat,": "A bilingual programme from CE2 to the baccalaureate,",
      "pour apprendre, comprendre et grandir entre deux cultures.": "to learn, understand and grow between two cultures.",
      "Voir les deux pôles": "View both campuses",
      "Voir les sept pôles": "View the seven sites",
      "Explorer les projets": "Explore projects",
      "Chiffres clés": "Key figures",
      "pôles collège et lycée": "middle and high school campuses",
      "établissements SIC à Rennes": "SIC schools in Rennes",
      "années de parcours continu": "years of continuous learning",
      "langues au quotidien": "languages used every day",
      "volets du parcours expliqués": "programme areas explained",
      "projets à découvrir": "projects to discover",
      "Grandir dans un parcours international": "Grow through an international programme",
      "Une progression continue qui articule langue, culture, disciplines et projets collectifs.": "A continuous pathway combining language, culture, academic subjects and collaborative projects.",
      "6e": "Grade 6",
      "Entrer dans le parcours et construire ses repères.": "Join the programme and build strong foundations.",
      "5e": "Grade 7",
      "Lire, écouter et s’exprimer avec plus d’aisance.": "Read, listen and communicate with greater confidence.",
      "4e": "Grade 8",
      "Développer l’analyse et les projets bilingues.": "Develop analytical skills through bilingual projects.",
      "Développer l’analyse, la littérature et les mathématiques en chinois.": "Develop analysis, literature and mathematics through Chinese.",
      "3e": "Grade 9",
      "Consolider les acquis et préparer la suite.": "Consolidate learning and prepare for the next stage.",
      "Consolider les acquis et préparer le cycle terminal.": "Consolidate learning and prepare for the upper high school cycle.",
      "Lycée": "High school",
      "Approfondir la langue, la culture et les disciplines.": "Deepen language, cultural and academic knowledge.",
      "Après-bac": "After graduation",
      "Valoriser un profil bilingue et international.": "Build on a bilingual, internationally minded profile.",
      "Les deux pôles de la SIC": "The two SIC campuses",
      "Les sept pôles de la SIC": "The seven SIC sites",
      "Découvrir le parcours →": "Discover the programme →",
      "Agenda prévisionnel": "Upcoming calendar",
      "Consulter l’agenda →": "View the calendar →",
      "Voir tous les projets →": "View all projects →",
      "Découvrez la continuité du parcours entre le collège et le lycée, ainsi que les équipes et enseignements associés.": "Discover the continuous pathway from middle to high school, together with its teams and teaching programme.",
      "Découvrez les sept établissements SIC à Rennes, de l’école primaire au lycée.": "Discover the seven SIC schools in Rennes, from primary to high school.",
      "Tous": "All",
      "École primaire": "Primary school",
      "Collège": "Middle school",
      "Rechercher un pôle": "Search campuses",
      "Aucun pôle ne correspond à cette recherche.": "No campus matches your search.",
      "Établissement introuvable": "Campus not found",
      "Présentation": "Overview",
      "Volets du parcours": "Programme areas",
      "Les informations détaillées seront ajoutées prochainement.": "Detailed information will be added shortly.",
      "Équipe enseignante": "Teaching team",
      "La présentation de l’équipe sera publiée après validation.": "The team overview will be published after approval.",
      "Localisation": "Location",
      "Type": "Type",
      "Adresse": "Address",
      "Parcours": "Programme",
      "Section internationale chinoise": "Chinese International Section",
      "Volets": "Areas",
      "À confirmer": "To be confirmed",
      "Visiter le site officiel": "Visit the official website",
      "Le parcours SIC": "The SIC programme",
      "Comprendre la progression du collège au lycée, les apprentissages renforcés et la préparation de son entrée dans la section.": "Understand the progression from middle to high school, enhanced learning and preparation for joining the section.",
      "Comprendre la progression du primaire au lycée, les apprentissages renforcés et la préparation de son entrée dans la section.": "Understand the progression from primary to high school, enhanced learning and preparation for joining the section.",
      "Voir le parcours →": "View programme →",
      "Programme introuvable": "Programme not found",
      "À qui s’adresse ce parcours ?": "Who is this programme for?",
      "Principaux avantages": "Key benefits",
      "Organisation 2026-2027": "2026-2027 organisation",
      "D’après l’arbre fourni : deux groupes d’écoles primaires alimentent deux collèges SIC, puis les deux collèges poursuivent vers le lycée Émile Zola.": "Based on the supplied tree: two primary-school groups feed into two SIC middle schools, and both middle schools then continue to Lycée Émile Zola.",
      "Une progression du primaire au BFI": "A continuous pathway from primary school to the BFI",
      "Méthodes d’enseignement": "Teaching methods",
      "Culture et projets": "Culture and projects",
      "Source pédagogique": "Teaching source",
      "Après ce parcours": "After the programme",
      "Où suivre ce volet ?": "Where is it taught?",
      "Les informations pratiques seront ajoutées après validation.": "Practical information will be added after approval.",
      "Préparer son projet": "Plan your application",
      "Découvrez les deux pôles SIC puis confirmez les modalités et dates auprès de l’établissement.": "Explore both SIC campuses, then confirm procedures and dates with the school.",
      "Découvrez les sept pôles SIC puis confirmez les modalités et dates auprès de l’établissement.": "Explore the seven SIC sites, then confirm procedures and dates with the school.",
      "Voir les pôles SIC": "View SIC campuses",
      "Réunions, ateliers, présentations et temps forts de la Section internationale chinoise. Les dates indiquées doivent être confirmées.": "Meetings, workshops, presentations and highlights from the Chinese International Section. Listed dates must be confirmed.",
      "Toutes": "All",
      "Productions bilingues, ateliers, échanges et projets culturels qui donnent vie au parcours SIC.": "Bilingual work, workshops, exchanges and cultural projects that bring the SIC programme to life.",
      "Toutes les années": "All years",
      "Toutes les catégories": "All categories",
      "Aucune activité ne correspond à ces filtres.": "No project matches these filters.",
      "L’équipe SIC": "The SIC team",
      "Les fonctions pédagogiques qui accompagnent les élèves et relient langue, disciplines, projets et familles.": "The teaching team supporting students and connecting language, subjects, projects and families.",
      "Cette page n’est pas encore disponible.": "This page is not available yet.",
      "Revenir à l’accueil": "Return home",
      "Page introuvable": "Page not found",
      "Public": "Public",
      "Information": "Information",
      "Rencontre": "Meeting",
      "Atelier": "Workshop",
      "Productions d’élèves": "Student work",
      "Langue et littérature": "Language and literature",
      "Arts": "Arts",
      "Vie de la section": "Section life",
      "Échanges": "Exchanges"
    }
  };

  const content = {
    zh: {
      schools: {
        "ecole-lille": {
          name: "小学部——L'Ille小学",
          description: "小学组 B，CM2 升入 Collège Émile Zola。2026-2027：CE2 学生未知，CM1 13 人，CM2 9 人；每周中文课 3 小时。"
        },
        "college-le-landry": {
          name: "初中部——Le Landry学校",
          description: "小学组 A 的升学初中，接收 Carle Bahon 和 La Poterie。2026-2027：6e 17-18 人，其他年级人数待确认。"
        },
        "ecole-carle-bahon": {
          name: "小学部——Carle Bahon小学",
          description: "小学组 A，CM2 升入 Collège Landry。2026-2027：CE2 学生未知，CM1 19 人，CM2 14 人；每周中文课 3 小时。"
        },
        "ecole-jules-ferry": {
          name: "小学部——Jules Ferry小学",
          description: "小学组 B，CM2 升入 Collège Émile Zola。2026-2027：CE2 学生未知，CM1 11 人，CM2 21 人；每周中文课 3 小时。"
        },
        "ecole-la-poterie": {
          name: "小学部——La Poterie小学",
          description: "小学组 A，CM2 升入 Collège Landry。2026-2027：CE2 明年关闭，CM1 5 人，CM2 16 人；每周中文课 3 小时。"
        },
        "college-emile-zola": {
          name: "初中部——埃米尔·左拉学校",
          description: "小学组 B 的升学初中，接收 Jules Ferry 和 L'Ille。2026-2027：6e 11-12 人，5e 13 人，4e 6-7 人，3e 10 人。"
        },
        "emile-zola": {
          name: "高中部——埃米尔·左拉学校",
          description: "两个 SIC 初中共同升入的高中。2026-2027：2nde 9 人，1ère 6-7 人，Terminale 5 人。"
        }
      },
      teachers: {
        "coordination-sic": { name: "国际班协调团队", biography: "负责家庭接待、学生跟进以及中文国际班各类项目的协调工作。" },
        "equipe-chinois": { name: "中文教学团队", biography: "开展强化中文教学，涵盖语言、文学和中国文化。" },
        "equipe-dnl": { name: "跨学科教学团队", biography: "通过跨学科内容和项目，让学生在真实情境中使用中文。" }
      },
      programs: {
        "enseignement-chinois": {
          name: "教学",
          title: "雷恩中文国际班的汉语教学",
          description: "从小学 CE2 到高中毕业班的连续课程，融合汉语、文学、中文学科教学和跨文化学习。",
          target: "面向雷恩各 SIC 教学点从小学到高中的学生，并根据年龄和学段循序推进。",
          advantages: ["从 CE2 到高三的连续培养", "汉语、文学与中文数学相结合", "主动参与式与跨文化教学"],
          cohort_map_2026: [
            "小学组 A → Collège Landry | École Carle Bahon | CE2 | 学生未知 | 法方老师 Audrey HELEU | 每周中文课 3h |",
            "小学组 A → Collège Landry | École Carle Bahon | CM1 | 19 人 | 法方老师 Anne-Sophie GUINET | 每周中文课 3h |",
            "小学组 A → Collège Landry | École Carle Bahon | CM2 | 14 人 | 暂无法方老师 | 每周中文课 3h |",
            "小学组 A → Collège Landry | École La Poterie | CE2 | 明年关闭 | — | 每周中文课 3h |",
            "小学组 A → Collège Landry | École La Poterie | CM1 | 5 人 | 法方老师 Corentin CAVE，小学校长 | 每周中文课 3h |",
            "小学组 A → Collège Landry | École La Poterie | CM2 | 16 人 | 法方老师 Emilie LIU | 每周中文课 3h |",
            "小学组 A → Collège Landry | Collège Landry | 6e | 17-18 人 | 中文老师未知；数学 王璐；文学未知 | 语言课 3h + 文学课 3h + 数学课 1h/周 |",
            "小学组 A → Collège Landry | Collège Landry | 5e | 学生未知 | 中文老师未知；数学 王璐；文学未知 | 语言课 3h + 文学课 3h + 数学课 1.5h/周 |",
            "小学组 A → Collège Landry | Collège Landry | 4e | 学生未知 | 中文老师未知；数学 王璐；文学未知 | 语言课 3h + 文学课 3h + 数学课 1.5h/周 |",
            "小学组 A → Collège Landry | Collège Landry | 3e | 学生未知 | 中文老师未知；数学 王璐；文学未知 | 语言课 3h + 文学课 3h + 数学课 2h/周 |",
            "小学组 B → Collège Émile Zola | École Jules Ferry | CE2 | 学生未知 | 法方老师 Lauria Moisson | 每周中文课 3h |",
            "小学组 B → Collège Émile Zola | École Jules Ferry | CM1 | 11 人 | 法方老师 Marika ISNARD | 每周中文课 3h |",
            "小学组 B → Collège Émile Zola | École Jules Ferry | CM2 | 21 人 | 法方老师 Marika ISNARD | 每周中文课 3h |",
            "小学组 B → Collège Émile Zola | École L'Ille | CE2 | 学生未知 | 法方老师 Genevive XU | 每周中文课 3h | 10 月退休，新法方老师待定",
            "小学组 B → Collège Émile Zola | École L'Ille | CM1 | 13 人 | 暂无法方老师 | 每周中文课 3h |",
            "小学组 B → Collège Émile Zola | École L'Ille | CM2 | 9 人 | 法方老师 Cécile CHANDERIS | 每周中文课 3h |",
            "小学组 B → Collège Émile Zola | Collège Émile Zola | 6e | 11-12 人 | 中文 吴立柔；数学 吴立柔；文学 时成玉 | 语言课 3h + 文学课 3h + 数学课 1h/周 |",
            "小学组 B → Collège Émile Zola | Collège Émile Zola | 5e | 13 人 | 中文 吴立柔；数学 吴立柔；文学 时成玉 | 语言课 3h + 文学课 3h + 数学课 1h/周 |",
            "小学组 B → Collège Émile Zola | Collège Émile Zola | 4e | 6-7 人 | 中文 Cédric Quennesson；数学 吴立柔；文学未知 | 语言课 3h + 文学课 3h + 数学课 1.5h/周 |",
            "小学组 B → Collège Émile Zola | Collège Émile Zola | 3e | 10 人 | 中文 吴立柔；数学 吴立柔；文学未知 | 语言课 3h + 文学课 3h + 数学课 2h/周 |",
            "两个初中 SIC → Lycée Émile Zola | Lycée Émile Zola | 2nde | 9 人 | 中文 吴立柔；数学 王璐；文学未知 | 按现行安排 |",
            "两个初中 SIC → Lycée Émile Zola | Lycée Émile Zola | 1ère | 6-7 人 | 中文 Cédric Quennesson；数学 王璐；文学未知；Connaissance du monde Cédric Quennesson | 按现行安排 |",
            "两个初中 SIC → Lycée Émile Zola | Lycée Émile Zola | Terminale | 5 人 | 中文 Cédric Quennesson；数学 王璐；文学未知；Connaissance du monde Cédric Quennesson | 按现行安排 |"
          ],
          stage_details: [
            "小学（CE2-CM2） | 每周 3 小时 | 所有小学班级每周中文课 3 小时。",
            "初中（6e-3e） | 语言课 3h + 文学课 3h + 数学课按年级不同 | 中文数学根据年级和校区安排为每周 1h、1.5h 或 2h。",
            "高中（2nde-Terminale） | 按现行安排 | 中文、数学、文学和 Connaissance du monde 按高中当年安排执行。"
          ],
          teaching_methods: [
            "通过节奏、手势、歌曲、模仿和引导练习训练声调与发音。",
            "结合字形、字音、字义、部件和汉字家族理解汉字构形。",
            "在交际情境中学习句式，并比较法语与汉语的表达规律。",
            "在文学、数学、戏剧和集体项目中使用中文进行学习、推理与创作。"
          ],
          cultural_projects: [
            "通过词汇、故事、图片和手工活动了解中国节日与传统。",
            "开展书法、剪纸、绘画、歌曲、诗歌和中法文学比较阅读。",
            "参加中文文化晚会、戏剧、口头展示和学生创作项目。",
            "比较中法文化参照，培养理解、尊重与跨文化视野。"
          ],
          higher_education: "高中阶段重点发展论述表达、文本分析和当代中国知识。高三课程还为法国国际高中毕业会考 BFI 做准备。",
          source_note: "2026-2027 组织图依据 SIC 团队提供的树状图整理。教学部分同时参考 2025 年大学研究《雷恩中文国际班项目中的汉语教学》。人数、老师和课时请以各学校最终安排为准。"
        },
        "sic-college": {
          name: "初中",
          title: "打下坚实基础",
          description: "循序渐进地培养双语理解、表达和学习自信。",
          target: "希望从初中开始接受双语及跨文化教育的学生。",
          advantages: ["持续使用中文", "掌握双语学习方法", "参与集体文化项目"],
          higher_education: "为高中阶段继续学习中文国际班课程做好准备。"
        },
        "sic-lycee": {
          name: "高中",
          title: "深入学习，放眼世界",
          description: "进一步提升语言、分析能力和国际学习环境中的自主性。",
          target: "希望发展高水平双语能力和国际化背景的高中生。",
          advantages: ["高级口头与书面表达", "文化与文学素养", "国际高等教育准备"],
          higher_education: "为语言类、选拔性课程和国际教育项目打开更多选择。"
        },
        "langue-litterature": {
          name: "中文",
          title: "语言、文化与文学",
          description: "在适合学生水平的进阶课程中学习阅读、写作、论述和文化作品。",
          target: "所有参加中文国际班课程的学生。",
          advantages: ["双语能力", "文化知识", "公众表达"],
          higher_education: "为未来学习和国际交流建立持久的语言基础。"
        },
        "dnl": {
          name: "跨学科",
          title: "通过学科学习中文",
          description: "在跨学科内容和项目中，把中文作为学习和工作的语言。",
          target: "愿意在语言课之外使用中文学习其他内容的学生。",
          advantages: ["专业词汇", "团队合作", "真实语言运用"],
          higher_education: "培养自主学习、分析和多语言工作的能力。"
        },
        "admission": {
          name: "入班",
          title: "准备申请",
          description: "了解课程、认识团队，并依据官方信息准备入班步骤。",
          target: "对雷恩中文国际班感兴趣的学生和家庭。",
          advantages: ["明确学习计划", "与团队交流", "循序准备"],
          higher_education: "具体申请方式和日期须向学校确认。"
        }
      },
      events: {
        "rentree-sic-2026": { title: "中文国际班开学——日期待确认", location: "雷恩", description: "欢迎学生并介绍国际班的学习安排。" },
        "reunion-familles-2026": { title: "家庭见面会——暂定日程", location: "雷恩", description: "与教学团队交流并了解本年度项目。" },
        "atelier-culture-2026": { title: "学生文化工作坊", location: "雷恩", description: "围绕中文、艺术和中国文化开展实践活动。" },
        "portes-ouvertes-2027": { title: "中文国际班介绍会——日期待确认", location: "雷恩", description: "了解课程体系、教学内容和国际班项目。" }
      },
      activities: {
        "journal-bilingue": { title: "学生双语校刊", description: "以中法双语发布文章、采访和创意作品。" },
        "lecture-partagee": { title: "跨文化共读", description: "阅读、介绍并讨论不同文化传统中的作品。" },
        "calligraphie": { title: "中国书法工作坊", description: "了解书写动作、汉字以及书写与艺术创作的关系。" },
        "nouvel-an": { title: "春节主题项目", description: "结合资料研究、口头表达和创意制作的集体项目。" },
        "correspondance": { title: "国际通信交流", description: "通过通信和合作作品在真实情境中练习语言。" },
        "portfolio": { title: "国际班学习档案", description: "保存代表性作品，记录学生多年来的成长。" }
      }
    },
    en: {
      schools: {
        "ecole-lille": {
          name: "Primary School Division — L'Ille",
          description: "Primary group B, with CM2 pupils continuing to Collège Émile Zola. 2026-2027: CE2 numbers unknown, CM1 13 pupils, CM2 9 pupils; Chinese 3 h/week."
        },
        "college-le-landry": {
          name: "Middle School Division — Le Landry",
          description: "Middle school for primary group A, receiving pupils from Carle Bahon and La Poterie. 2026-2027: 6e 17-18 pupils; other year-group numbers to be confirmed."
        },
        "ecole-carle-bahon": {
          name: "Primary School Division — Carle Bahon",
          description: "Primary group A, with CM2 pupils continuing to Collège Landry. 2026-2027: CE2 numbers unknown, CM1 19 pupils, CM2 14 pupils; Chinese 3 h/week."
        },
        "ecole-jules-ferry": {
          name: "Primary School Division — Jules Ferry",
          description: "Primary group B, with CM2 pupils continuing to Collège Émile Zola. 2026-2027: CE2 numbers unknown, CM1 11 pupils, CM2 21 pupils; Chinese 3 h/week."
        },
        "ecole-la-poterie": {
          name: "Primary School Division — La Poterie",
          description: "Primary group A, with CM2 pupils continuing to Collège Landry. 2026-2027: CE2 closes next year, CM1 5 pupils, CM2 16 pupils; Chinese 3 h/week."
        },
        "college-emile-zola": {
          name: "Middle School Division — Émile Zola",
          description: "Middle school for primary group B, receiving pupils from Jules Ferry and L'Ille. 2026-2027: 6e 11-12, 5e 13, 4e 6-7, 3e 10 pupils."
        },
        "emile-zola": {
          name: "High School Division — Émile Zola",
          description: "High school pathway for both SIC middle schools. 2026-2027: 2nde 9 pupils, 1ère 6-7 pupils, Terminale 5 pupils."
        }
      },
      teachers: {
        "coordination-sic": { name: "SIC Coordination", biography: "Welcoming families, monitoring student progress and coordinating Chinese International Section projects." },
        "equipe-chinois": { name: "Chinese Teaching Team", biography: "Enhanced teaching of Chinese language, literature and cultures." },
        "equipe-dnl": { name: "Interdisciplinary Team", biography: "Cross-curricular projects that use Chinese in practical learning situations." }
      },
      programs: {
        "enseignement-chinois": {
          name: "Teaching",
          title: "Chinese teaching in the Rennes SIC programme",
          description: "A continuous pathway from CE2 to the final year of high school, combining language, literature, subjects taught in Chinese and intercultural learning.",
          target: "Students at the Rennes SIC sites from primary to high school, with progression adapted to each age group.",
          advantages: ["Continuity from CE2 to the final year", "Chinese, literature and mathematics in Chinese", "Active and intercultural teaching"],
          cohort_map_2026: [
            "Primary group A → Collège Landry | École Carle Bahon | CE2 | numbers unknown | French-side teacher Audrey HELEU | Chinese 3 h/week |",
            "Primary group A → Collège Landry | École Carle Bahon | CM1 | 19 pupils | French-side teacher Anne-Sophie GUINET | Chinese 3 h/week |",
            "Primary group A → Collège Landry | École Carle Bahon | CM2 | 14 pupils | French-side teacher to be confirmed | Chinese 3 h/week |",
            "Primary group A → Collège Landry | École La Poterie | CE2 | closes next year | — | Chinese 3 h/week |",
            "Primary group A → Collège Landry | École La Poterie | CM1 | 5 pupils | French-side teacher Corentin CAVE, school head | Chinese 3 h/week |",
            "Primary group A → Collège Landry | École La Poterie | CM2 | 16 pupils | French-side teacher Emilie LIU | Chinese 3 h/week |",
            "Primary group A → Collège Landry | Collège Landry | 6e | 17-18 pupils | Chinese teacher unknown; mathematics Wang Lu; literature unknown | language 3 h + literature 3 h + mathematics 1 h/week |",
            "Primary group A → Collège Landry | Collège Landry | 5e | numbers unknown | Chinese teacher unknown; mathematics Wang Lu; literature unknown | language 3 h + literature 3 h + mathematics 1.5 h/week |",
            "Primary group A → Collège Landry | Collège Landry | 4e | numbers unknown | Chinese teacher unknown; mathematics Wang Lu; literature unknown | language 3 h + literature 3 h + mathematics 1.5 h/week |",
            "Primary group A → Collège Landry | Collège Landry | 3e | numbers unknown | Chinese teacher unknown; mathematics Wang Lu; literature unknown | language 3 h + literature 3 h + mathematics 2 h/week |",
            "Primary group B → Collège Émile Zola | École Jules Ferry | CE2 | numbers unknown | French-side teacher Lauria Moisson | Chinese 3 h/week |",
            "Primary group B → Collège Émile Zola | École Jules Ferry | CM1 | 11 pupils | French-side teacher Marika ISNARD | Chinese 3 h/week |",
            "Primary group B → Collège Émile Zola | École Jules Ferry | CM2 | 21 pupils | French-side teacher Marika ISNARD | Chinese 3 h/week |",
            "Primary group B → Collège Émile Zola | École L'Ille | CE2 | numbers unknown | French-side teacher Genevive XU | Chinese 3 h/week | retiring in October; new teacher to be confirmed",
            "Primary group B → Collège Émile Zola | École L'Ille | CM1 | 13 pupils | French-side teacher to be confirmed | Chinese 3 h/week |",
            "Primary group B → Collège Émile Zola | École L'Ille | CM2 | 9 pupils | French-side teacher Cécile CHANDERIS | Chinese 3 h/week |",
            "Primary group B → Collège Émile Zola | Collège Émile Zola | 6e | 11-12 pupils | Chinese Wu Lirou; mathematics Wu Lirou; literature Shi Chengyu | language 3 h + literature 3 h + mathematics 1 h/week |",
            "Primary group B → Collège Émile Zola | Collège Émile Zola | 5e | 13 pupils | Chinese Wu Lirou; mathematics Wu Lirou; literature Shi Chengyu | language 3 h + literature 3 h + mathematics 1 h/week |",
            "Primary group B → Collège Émile Zola | Collège Émile Zola | 4e | 6-7 pupils | Chinese Cédric Quennesson; mathematics Wu Lirou; literature unknown | language 3 h + literature 3 h + mathematics 1.5 h/week |",
            "Primary group B → Collège Émile Zola | Collège Émile Zola | 3e | 10 pupils | Chinese Wu Lirou; mathematics Wu Lirou; literature unknown | language 3 h + literature 3 h + mathematics 2 h/week |",
            "Two SIC middle schools → Lycée Émile Zola | Lycée Émile Zola | 2nde | 9 pupils | Chinese Wu Lirou; mathematics Wang Lu; literature unknown | according to current organisation |",
            "Two SIC middle schools → Lycée Émile Zola | Lycée Émile Zola | 1ère | 6-7 pupils | Chinese Cédric Quennesson; mathematics Wang Lu; literature unknown; connaissance du monde Cédric Quennesson | according to current organisation |",
            "Two SIC middle schools → Lycée Émile Zola | Lycée Émile Zola | Terminale | 5 pupils | Chinese Cédric Quennesson; mathematics Wang Lu; literature unknown; connaissance du monde Cédric Quennesson | according to current organisation |"
          ],
          stage_details: [
            "Primary school (CE2-CM2) | 3 hours per week | All primary classes have 3 hours of Chinese each week.",
            "Middle school (6e-3e) | 3 h language + 3 h literature + mathematics depending on the year group | Mathematics in Chinese is organised by year group and school: 1 h, 1.5 h or 2 h per week.",
            "High school (2nde-Terminale) | According to current organisation | Chinese, mathematics, literature and connaissance du monde follow the annual high-school timetable."
          ],
          teaching_methods: [
            "Develop tones and pronunciation through rhythm, gesture, songs, imitation and guided repetition.",
            "Understand characters through form, sound, meaning, components and character families.",
            "Learn grammar through communication and comparisons between French and Chinese.",
            "Use Chinese to learn, reason and create through literature, mathematics, theatre and group projects."
          ],
          cultural_projects: [
            "Discover Chinese festivals and traditions through language, stories, images and hands-on activities.",
            "Calligraphy, paper cutting, painting, songs, poetry and comparative reading.",
            "Chinese cultural evening, theatre, oral presentations and student productions.",
            "Compare Chinese and French cultural references to develop understanding, respect and intercultural awareness."
          ],
          higher_education: "In high school, students develop reasoned expression, text analysis and knowledge of contemporary China. The final year also prepares students for the French International Baccalaureate (BFI).",
          source_note: "The 2026-2027 organisation is based on the tree supplied by the SIC team. The teaching section also uses the 2025 university paper «雷恩中文国际班项目中的汉语教学». Pupil numbers, teachers and timetables must be confirmed with each school."
        },
        "sic-college": {
          name: "Middle school",
          title: "Build strong foundations",
          description: "A progressive programme developing bilingual comprehension, communication and confidence.",
          target: "Students motivated by bilingual and intercultural education from middle school.",
          advantages: ["Regular use of Chinese", "Bilingual learning methods", "Collaborative cultural projects"],
          higher_education: "A natural preparation for continuing the SIC programme in high school."
        },
        "sic-lycee": {
          name: "High school",
          title: "Deepen learning and open up to the world",
          description: "An advanced stage consolidating language, analytical ability and independence in an international environment.",
          target: "High school students seeking a demanding bilingual and internationally minded profile.",
          advantages: ["Advanced spoken and written communication", "Culture and literature", "Preparation for international study"],
          higher_education: "Opens pathways to language studies, selective programmes and international degrees."
        },
        "langue-litterature": {
          name: "中文",
          title: "Language, culture and literature",
          description: "Read, write, discuss and discover literary works and cultural references through a structured progression.",
          target: "All students enrolled in the SIC programme.",
          advantages: ["Bilingual skills", "Cultural knowledge", "Public speaking"],
          higher_education: "A lasting foundation for future study and international mobility."
        },
        "dnl": {
          name: "CLIL",
          title: "Learn through academic subjects",
          description: "Chinese becomes a working language through interdisciplinary content and projects.",
          target: "Students ready to use Chinese beyond language lessons.",
          advantages: ["Subject-specific vocabulary", "Teamwork", "Practical language use"],
          higher_education: "Develops independence, analysis and the ability to work across languages."
        },
        "admission": {
          name: "Entry",
          title: "Prepare your application",
          description: "Understand the programme, meet the team and prepare the admission process using official information.",
          target: "Students and families interested in SIC in Rennes.",
          advantages: ["A clear study plan", "Discussion with the team", "Step-by-step preparation"],
          higher_education: "Procedures and dates must always be confirmed with the school."
        }
      },
      events: {
        "rentree-sic-2026": { title: "SIC school year begins — date to be confirmed", description: "Welcome session and introduction to how the section operates." },
        "reunion-familles-2026": { title: "Family meeting — provisional calendar", description: "Meet the teaching team and discover the section's projects." },
        "atelier-culture-2026": { title: "Student cultural workshop", description: "A practical workshop exploring language, arts and Chinese cultures." },
        "portes-ouvertes-2027": { title: "SIC presentation — date to be confirmed", description: "Discover the programme, teaching and section projects." }
      },
      activities: {
        "journal-bilingue": { title: "Student bilingual journal", description: "Articles, interviews and creative work published in French and Chinese." },
        "lecture-partagee": { title: "Shared readings", description: "Read, present and discuss texts from different traditions." },
        "calligraphie": { title: "Chinese calligraphy workshop", description: "Explore gesture, characters and the relationship between writing and creativity." },
        "nouvel-an": { title: "Chinese New Year project", description: "A collaborative project combining research, public speaking and creativity." },
        "correspondance": { title: "International correspondence", description: "Practise language through exchanges and collaborative work." },
        "portfolio": { title: "SIC learning portfolio", description: "Preserve key work and track progress over the years." }
      }
    }
  };

  function translate(value) {
    if (language === "fr" || typeof value !== "string") return value;
    const dictionary = messages[language] || {};
    if (dictionary[value]) return dictionary[value];
    return Object.keys(dictionary)
      .sort((left, right) => right.length - left.length)
      .reduce((result, source) => result.includes(source) ? result.replaceAll(source, dictionary[source]) : result, value);
  }

  function localizeData(source) {
    const result = JSON.parse(JSON.stringify(source));
    const overrides = content[language];
    if (!overrides) return result;
    Object.entries(overrides).forEach(([collection, records]) => {
      result[collection] = result[collection].map((item) => ({ ...item, ...(records[item.id] || {}) }));
    });
    return result;
  }

  function translatePage(root = document) {
    document.documentElement.lang = locales[language];
    document.title = translate(document.title);
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (["SCRIPT", "STYLE"].includes(node.parentElement?.tagName)) return;
      const trimmed = node.nodeValue.trim();
      const translated = translate(trimmed);
      if (!trimmed || translated === trimmed) return;
      node.nodeValue = node.nodeValue.replace(trimmed, translated);
    });
    root.querySelectorAll?.("[placeholder],[aria-label],[title]").forEach((element) => {
      ["placeholder", "aria-label", "title"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (value) element.setAttribute(attribute, translate(value));
      });
    });
  }

  function setLanguage(next) {
    if (!supported.includes(next)) return;
    localStorage.setItem("sic_language", next);
    location.reload();
  }

  document.documentElement.lang = locales[language];
  window.SICI18n = { language, locale: locales[language], translate, translatePage, localizeData, setLanguage };
})();

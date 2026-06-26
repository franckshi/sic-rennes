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
      "Primaire · CE2-CM2": "小学 · CE2-CM2",
      "Découvrir le chinois par l’oral, les jeux, les chants, les images, les gestes et les premiers caractères.": "通过口语、游戏、歌曲、图片、动作和最初的汉字发现中文。",
      "Collège · 6e-3e": "初中 · 6e-3e",
      "Approfondir la langue, entrer dans la littérature chinoise et utiliser le chinois en mathématiques.": "加深中文学习，进入中国文学，并用中文学习数学。",
      "Lycée · 2nde-Terminale": "高中 · 2nde-Terminale",
      "Élargir la littérature, renforcer les mathématiques et découvrir le monde en chinois.": "拓宽文学学习，加强数学深度，并用中文发现世界。",
      "Valoriser un profil bilingue, interculturel et international pour construire son projet d’études.": "发挥双语、跨文化与国际化背景，规划未来学习路径。",
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
      "Deux chemins, un même lycée": "两条升学路径，一个共同高中",
      "Les écoles primaires sont organisées en deux groupes de poursuite vers deux collèges, puis tous les élèves rejoignent le Lycée Émile Zola.": "小学分成两个升学组，分别进入两个 SIC 初中，之后所有学生进入埃米尔·左拉高中。",
      "Groupe A primaire → Collège Landry": "小学组 A → Collège Landry",
      "Groupe B primaire → Collège Émile Zola": "小学组 B → Collège Émile Zola",
      "Carle Bahon et La Poterie forment le groupe A. Les CM2 poursuivent vers Collège Landry, puis vers Lycée Émile Zola.": "Carle Bahon 和 La Poterie 组成 A 组，CM2 后升入 Collège Landry，再升入 Lycée Émile Zola。",
      "Jules Ferry et L'Ille forment le groupe B. Les CM2 poursuivent vers Collège Émile Zola, puis vers Lycée Émile Zola.": "Jules Ferry 和 L'Ille 组成 B 组，CM2 后升入 Collège Émile Zola，再升入 Lycée Émile Zola。",
      "Carte des pôles": "校区分布图",
      "Une lecture rapide de la répartition des sept sites dans Rennes.": "快速查看七个教学点在雷恩的分布。",
      "Carte des 7 pôles SIC à Rennes": "雷恩 7 个 SIC 教学点地图",
      "Survolez un repère pour lire le résumé de l’établissement. Cliquez sur le repère pour ouvrir sa page.": "鼠标移到图钉上可查看学校简介，点击图钉进入学校页面。",
      "Carte interactive des pôles SIC": "SIC 教学点互动地图",
      "● Primaire": "● 小学",
      "● Lycée": "● 高中",
      "Nord": "北部",
      "Centre": "市中心",
      "Sud-Est": "东南部",
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
      "Enseignants et référents": "教师与负责人",
      "Coordination à confirmer": "Coordo 待确认",
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
      "Primaire · CE2-CM2": "Primary · CE2-CM2",
      "Découvrir le chinois par l’oral, les jeux, les chants, les images, les gestes et les premiers caractères.": "Discover Chinese through speaking, games, songs, images, gestures and first characters.",
      "Collège · 6e-3e": "Middle school · 6e-3e",
      "Approfondir la langue, entrer dans la littérature chinoise et utiliser le chinois en mathématiques.": "Deepen Chinese, enter Chinese literature and use Chinese in mathematics.",
      "Lycée · 2nde-Terminale": "High school · 2nde-Terminale",
      "Élargir la littérature, renforcer les mathématiques et découvrir le monde en chinois.": "Broaden literature, strengthen mathematics and discover the world in Chinese.",
      "Valoriser un profil bilingue, interculturel et international pour construire son projet d’études.": "Build on a bilingual, intercultural and international profile for future studies.",
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
      "Deux chemins, un même lycée": "Two pathways, one shared high school",
      "Les écoles primaires sont organisées en deux groupes de poursuite vers deux collèges, puis tous les élèves rejoignent le Lycée Émile Zola.": "The primary schools are organised into two progression groups feeding two middle schools, then all pupils continue to Lycée Émile Zola.",
      "Groupe A primaire → Collège Landry": "Primary group A → Collège Landry",
      "Groupe B primaire → Collège Émile Zola": "Primary group B → Collège Émile Zola",
      "Carle Bahon et La Poterie forment le groupe A. Les CM2 poursuivent vers Collège Landry, puis vers Lycée Émile Zola.": "Carle Bahon and La Poterie form group A. CM2 pupils continue to Collège Landry, then to Lycée Émile Zola.",
      "Jules Ferry et L'Ille forment le groupe B. Les CM2 poursuivent vers Collège Émile Zola, puis vers Lycée Émile Zola.": "Jules Ferry and L'Ille form group B. CM2 pupils continue to Collège Émile Zola, then to Lycée Émile Zola.",
      "Carte des pôles": "Campus map",
      "Une lecture rapide de la répartition des sept sites dans Rennes.": "A quick view of the seven sites across Rennes.",
      "Carte des 7 pôles SIC à Rennes": "Map of the 7 SIC sites in Rennes",
      "Survolez un repère pour lire le résumé de l’établissement. Cliquez sur le repère pour ouvrir sa page.": "Hover over a marker to read the school summary. Click the marker to open the school page.",
      "Carte interactive des pôles SIC": "Interactive SIC campus map",
      "● Primaire": "● Primary",
      "● Lycée": "● High school",
      "Nord": "North",
      "Centre": "Centre",
      "Sud-Est": "South-East",
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
      "Enseignants et référents": "Teachers and coordinators",
      "Coordination à confirmer": "Coordination to be confirmed",
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
        "equipe-primaire": {
          name: "小学团队",
          level: "小学",
          coordo: "小学 coordo 待确认",
          members: [
            "Audrey HELEU — CE2，École Carle Bahon",
            "Anne-Sophie GUINET — CM1，École Carle Bahon",
            "Corentin CAVE — CM1，École La Poterie，小学校长",
            "Emilie LIU — CM2，École La Poterie",
            "Lauria Moisson — CE2，École Jules Ferry",
            "Marika ISNARD — CM1-CM2，École Jules Ferry",
            "Genevive XU — CE2，École L'Ille，10 月退休",
            "Cécile CHANDERIS — CM2，École L'Ille",
            "待确认负责人 — Carle Bahon CM2 与 L'Ille CM1"
          ],
          biography: "小学团队通过口语、游戏、歌曲、动作、故事、图片和最初的汉字，让学生在活动中发现中文、敢于开口，并为初中阶段建立稳定基础。"
        },
        "equipe-college": {
          name: "初中团队",
          level: "初中",
          coordo: "初中 coordo 待确认",
          members: [
            "吴立柔 — 中文与数学，Collège Émile Zola",
            "Cédric Quennesson — 中文，Collège Émile Zola",
            "时成玉 — 文学，Collège Émile Zola",
            "王璐 — 数学，Collège Landry",
            "中文老师待确认 — Collège Landry",
            "文学老师待确认 — Collège Landry 及 Collège Émile Zola 部分年级"
          ],
          biography: "初中团队带领学生进入更系统的中文学习：语言课不断加深，同时开始接触中国文学，并把中文作为数学推理和表达的工具。"
        },
        "equipe-lycee": {
          name: "高中团队",
          level: "高中",
          coordo: "高中 coordo 待确认",
          members: [
            "吴立柔 — 中文，2nde",
            "Cédric Quennesson — 中文与 Connaissance du monde，1ère 与 Terminale",
            "王璐 — 数学，高中部",
            "文学老师待确认 — 高中部"
          ],
          biography: "高中团队加强语言深度、文学广度、数学表达和 Connaissance du monde。学生用中文分析、比较、论证，并从不同视角理解世界。"
        }
      },
      programs: {
        "cycle-primaire": {
          name: "小学",
          title: "发现中文，建立基础",
          description: "小学阶段通过口语、游戏、歌曲、图片、动作和最初的汉字进入中文学习。",
          target: "雷恩 SIC 小学 CE2、CM1、CM2 学生。",
          advantages: ["在活动中发现中文", "建立语音、词汇和汉字基础", "用游戏和文化活动培养学习兴趣"],
          stage_details: [
            "CE2-CM2 | 每周中文 3 小时 | 重点是建立信心：听、说、模仿、认读词语、感知声调，并逐步进入汉字。",
            "活动方式 | 游戏、歌曲、故事、图片、动作和创作 | 让语言变得具体，把中文学习、文化好奇心和个人表达连接起来。",
            "升入初中 | 延续到 6e | 学生带着基本课堂习惯、口语基础、词汇和汉字意识进入初中。"
          ],
          teaching_methods: [
            "在简单、重复、有安全感的情境中接触中文。",
            "把声音、动作、图片和汉字联系起来，避免过早抽象化。",
            "优先鼓励参与、表达和创造，再逐步提高学术要求。"
          ],
          higher_education: "小学阶段为初中更系统的课程做准备；从初中开始，文学和中文数学会逐步加入。"
        },
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
          title: "深化语言，进入学科学习",
          description: "初中阶段继续加深中文，同时开始接触中国文学，并用中文学习数学。",
          target: "Collège Landry 与 Collège Émile Zola 两个 SIC 初中 6e 到 3e 学生。",
          advantages: ["更系统的中文学习", "开始进入中国文学", "按年级安排中文数学"],
          stage_details: [
            "中文语言 | 每周 3 小时 | 学生持续巩固语音、词汇、汉字、理解和表达，要求逐年提高。",
            "文学 | 每周 3 小时 | 学生接触文本、故事、文化参照，并开始进行适合初中阶段的分析。",
            "中文数学 | 每周 1 到 2 小时，按年级不同 | 中文成为推理语言：解释步骤、使用数学词汇，并用中文解决问题。"
          ],
          teaching_methods: [
            "从小学的活动式发现，过渡到更规律、更有要求的学习。",
            "通过阅读、解释、比较和复述，建立双语思考能力。",
            "把语言连接到文学和数学，让中文有真实用途。"
          ],
          higher_education: "初中为升入 Lycée Émile Zola 做准备；高中阶段文学、数学和世界认知会进一步加深。"
        },
        "sic-lycee": {
          name: "高中",
          title: "提高深度，准备 BFI",
          description: "高中阶段加强语言能力，拓宽中国文学学习，加深中文数学，并通过 Connaissance du monde 用中文发现世界。",
          target: "在 Lycée Émile Zola 继续 SIC 的 2nde、1ère 与 Terminale 学生。",
          advantages: ["用中文分析与论证", "文学学习更深更广", "通过 Connaissance du monde 打开世界视角"],
          stage_details: [
            "2nde | 巩固与过渡 | 学生稳定初中阶段所学，加强表达，并根据高中安排继续中文数学。",
            "1ère-Terminale | 深入学习 | 中文成为分析工具：论证、解释、比较、展示并表达个人观点。",
            "BFI 与高中毕业后 | 价值体现 | 课程帮助学生形成双语、跨文化、国际化的学习档案。"
          ],
          teaching_methods: [
            "处理更长的文本、作品、问题意识和口头展示。",
            "用中文分析、推理，并从不同角度理解世界。",
            "逐步培养高等教育所需的自主学习能力。"
          ],
          higher_education: "高中 SIC 有助于学生在 Parcoursup 和未来申请中展示语言、方法、文化与国际化背景。"
        },
        "langue-litterature": {
          name: "文学",
          title: "语言、文化与中国文学",
          description: "从口语和初级文本逐步走向文学分析，学生学习用中文阅读、解释和论证。",
          target: "初中与高中学生，内容根据年级逐步提高。",
          advantages: ["阅读并解释文本", "建立文化参照", "提高中文论述精确度"],
          stage_details: [
            "初中 | 进入文本 | 学生接触故事、短文、文化背景和基础分析方法。",
            "高中 | 深化与拓宽 | 文学内容更有深度和广度，加入问题意识、观点比较和论证表达。",
            "文化 | 建立联系 | 通过作品理解不同想象、价值、历史背景和世界观。"
          ],
          teaching_methods: ["阅读、复述、解释和比较文本。", "把语言、文化和历史连接起来。", "从理解逐步走向有论据的解释。"],
          higher_education: "文学学习强化表达、文化素养和多语言学习能力。"
        },
        "mathematiques-chinois": {
          name: "数学",
          title: "用中文学习数学",
          description: "中文数学让学生把中文作为推理语言，而不只是交流语言。",
          target: "初中与高中学生，具体课时按年级安排。",
          advantages: ["掌握数学专业词汇", "用中文解释推理过程", "把语言学习转化为学科学习"],
          stage_details: [
            "初中 | 建立工具 | 学生学习用中文命名、解释和操作数学概念。",
            "高中 | 加深要求 | 内容更复杂，中文用于证明步骤、展示解法和组织推理。",
            "方法 | 换一种语言思考 | 更换语言迫使学生澄清步骤，让思维更精确。"
          ],
          teaching_methods: ["逐步引入专业词汇。", "让学生口头和书面说明解题过程。", "把数学严谨性与语言准确性结合起来。"],
          higher_education: "这种学习方式强化学生在科学和国际环境中工作的能力。"
        },
        "connaissance-monde": {
          name: "世界",
          title: "Connaissance du monde",
          description: "高中阶段通过 Connaissance du monde 用中文发现世界，看到不同参照和不同视角。",
          target: "Lycée Émile Zola 的 1ère 与 Terminale 学生。",
          advantages: ["跨文化视角", "分析社会与当代议题", "提高有论点的口头表达"],
          stage_details: [
            "1ère-Terminale | 打开视野 | 学生用中文观察社会、文化、当代问题和思想流动。",
            "方法 | 比较观点 | 课程帮助学生理解同一个问题在不同语言、历史和文化参照中会有不同读法。",
            "产出 | 展示与论证 | 学生学习组织展示、提出分析并丰富文化背景。"
          ],
          teaching_methods: ["通过文献、案例、图片、讨论和展示开展学习。", "在中文世界、法国世界和国际问题之间建立比较思维。", "把中文作为理解现实世界的分析语言。"],
          higher_education: "Connaissance du monde 对国际关系、政治学、商科、语言、人文社科和双学位方向都有帮助。"
        },
        "avenir": {
          name: "未来",
          title: "高中毕业后：建设国际化学习档案",
          description: "SIC 帮助学生把双语能力、学习要求和国际视野转化为高等教育优势。",
          target: "准备高中毕业后方向的高中学生和家庭。",
          advantages: ["可展示的双语背景", "国际化文化素养", "自主学习和分析能力"],
          stage_details: [
            "能力 | 语言、方法与文化 | 学生可以展示在多语言和多文化参照中学习、思考和表达的能力。",
            "方向 | 法国与国际 | 支持大学、预科、双文凭、学校、交换和国际课程等多种路径。",
            "个人项目 | 形成差异化 | SIC 为学生提供讲述个人路径、投入、文化好奇心和学习能力的素材。"
          ],
          teaching_methods: ["帮助学生识别课程中形成的可迁移能力。", "把课程学习和未来专业、流动项目连接起来。", "突出比较、解释和论证的国际化能力。"],
          higher_education: "高中毕业后，SIC 可支持语言、科学、经济、法律、政治、文化和国际方向的多种选择。"
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
        "equipe-primaire": {
          name: "Primary team",
          level: "Primary",
          coordo: "Primary coordinator to be confirmed",
          members: [
            "Audrey HELEU — CE2, École Carle Bahon",
            "Anne-Sophie GUINET — CM1, École Carle Bahon",
            "Corentin CAVE — CM1, École La Poterie, school head",
            "Emilie LIU — CM2, École La Poterie",
            "Lauria Moisson — CE2, École Jules Ferry",
            "Marika ISNARD — CM1-CM2, École Jules Ferry",
            "Genevive XU — CE2, École L'Ille, retiring in October",
            "Cécile CHANDERIS — CM2, École L'Ille",
            "Referents to be confirmed — Carle Bahon CM2 and L'Ille CM1"
          ],
          biography: "The primary team introduces Chinese through speaking, games, songs, gestures, stories, images and first characters, helping pupils discover the language, gain confidence and build foundations for middle school."
        },
        "equipe-college": {
          name: "Middle school team",
          level: "Middle school",
          coordo: "Middle school coordinator to be confirmed",
          members: [
            "Wu Lirou — Chinese and mathematics, Collège Émile Zola",
            "Cédric Quennesson — Chinese, Collège Émile Zola",
            "Shi Chengyu — literature, Collège Émile Zola",
            "Wang Lu — mathematics, Collège Landry",
            "Chinese teachers to be confirmed — Collège Landry",
            "Literature teachers to be confirmed — Collège Landry and some Collège Émile Zola levels"
          ],
          biography: "The middle school team moves pupils into more structured Chinese: language becomes deeper, Chinese literature begins, and Chinese is used as a tool for mathematical reasoning and expression."
        },
        "equipe-lycee": {
          name: "High school team",
          level: "High school",
          coordo: "High school coordinator to be confirmed",
          members: [
            "Wu Lirou — Chinese, 2nde",
            "Cédric Quennesson — Chinese and Connaissance du monde, 1ère and Terminale",
            "Wang Lu — mathematics, high school",
            "Literature teachers to be confirmed — high school"
          ],
          biography: "The high school team deepens language, broadens literary culture, strengthens mathematics and develops Connaissance du monde. Students use Chinese to analyse, compare, argue and understand the world from different perspectives."
        }
      },
      programs: {
        "cycle-primaire": {
          name: "Primary",
          title: "Discover Chinese and build foundations",
          description: "In primary school, pupils enter Chinese through speaking, games, songs, images, gestures and first characters.",
          target: "CE2, CM1 and CM2 pupils enrolled in the Rennes SIC primary schools.",
          advantages: ["Discover Chinese through activities", "Build sound, word and character foundations", "Learn through games and culture"],
          stage_details: [
            "CE2-CM2 | 3 hours of Chinese per week | The priority is confidence: listening, speaking, imitating, recognising words, sensing tones and gradually entering characters.",
            "Activities | Games, songs, stories, images, gestures and creation | Activities make language concrete and connect language learning, cultural curiosity and personal expression.",
            "Towards middle school | Continuity into 6e | Pupils enter middle school with classroom routines, oral foundations, vocabulary and first character awareness."
          ],
          teaching_methods: [
            "Discover Chinese in simple, repeated and reassuring situations.",
            "Connect sounds, gestures, images and characters so learning is not too abstract.",
            "Value participation, expression and creativity before academic demand increases."
          ],
          higher_education: "Primary school prepares pupils for the more structured middle school cycle, where literature and mathematics in Chinese are gradually added."
        },
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
          title: "Deepen the language and enter academic subjects",
          description: "In middle school, pupils deepen Chinese, begin Chinese literature and use the language to learn mathematics.",
          target: "Students from 6e to 3e in the two SIC middle schools: Collège Landry and Collège Émile Zola.",
          advantages: ["More structured Chinese learning", "First approach to Chinese literature", "Mathematics in Chinese depending on the year group"],
          stage_details: [
            "Chinese language | 3 hours per week | Pupils consolidate pronunciation, vocabulary, characters, comprehension and expression, with increasing expectations each year.",
            "Literature | 3 hours per week | Pupils discover texts, narratives, cultural references and first levels of analysis adapted to middle school.",
            "Mathematics in Chinese | 1 to 2 hours per week depending on level | Chinese becomes a reasoning language: explain steps, use mathematical vocabulary and solve problems in Chinese."
          ],
          teaching_methods: [
            "Move from playful discovery to regular and more demanding practice.",
            "Read, explain, compare and reformulate to build bilingual thinking.",
            "Connect language with literature and mathematics so Chinese has concrete uses."
          ],
          higher_education: "Middle school prepares pupils for Lycée Émile Zola, where literature, mathematics and world perspectives become deeper."
        },
        "sic-lycee": {
          name: "High school",
          title: "Gain depth and prepare the BFI",
          description: "In high school, students strengthen the language, broaden Chinese literature, deepen mathematics and discover the world in Chinese through Connaissance du monde.",
          target: "2nde, 1ère and Terminale students continuing the SIC programme at Lycée Émile Zola.",
          advantages: ["Analysis and argumentation in Chinese", "Broader and deeper literature", "A world perspective through Connaissance du monde"],
          stage_details: [
            "2nde | Consolidation and transition | Students stabilise middle school learning, strengthen expression and continue mathematics in Chinese according to the high school timetable.",
            "1ère-Terminale | Deepening | Chinese becomes an analytical tool: argue, interpret, compare, present and defend a point of view.",
            "BFI and after graduation | Profile building | The programme helps students build a bilingual, intercultural and international learning profile."
          ],
          teaching_methods: [
            "Work with longer documents, literary works, issues and presentations.",
            "Use Chinese to analyse, reason and understand the world from different angles.",
            "Gradually prepare the autonomy expected in higher education."
          ],
          higher_education: "High school SIC helps students show language, method, culture and international background in future applications."
        },
        "langue-litterature": {
          name: "Literature",
          title: "Chinese language, culture and literature",
          description: "From spoken language and early texts towards literary analysis, students learn to read, interpret and argue in Chinese.",
          target: "Middle and high school students, with content adapted to each level.",
          advantages: ["Read and interpret texts", "Build cultural references", "Argue with precision in Chinese"],
          stage_details: [
            "Middle school | Entering texts | Pupils discover stories, short texts, cultural contexts and basic analytical methods.",
            "High school | Deepening and broadening | Literature becomes deeper and wider, with issues, viewpoint comparison and argued expression.",
            "Culture | Making connections | Works help students understand imaginaries, values, historical contexts and worldviews."
          ],
          teaching_methods: ["Read, reformulate, explain and compare texts.", "Connect language, culture and history to build meaning.", "Move gradually from comprehension to argued interpretation."],
          higher_education: "Literature strengthens expression, cultural knowledge and the ability to work in several languages."
        },
        "mathematiques-chinois": {
          name: "Maths",
          title: "Mathematics in Chinese",
          description: "Mathematics turns Chinese into a language of reasoning, not only a language of communication.",
          target: "Middle and high school students according to the timetable for each year group.",
          advantages: ["Specialised mathematical vocabulary", "Reasoning explained in Chinese", "A concrete bridge from language to subject learning"],
          stage_details: [
            "Middle school | Building tools | Pupils learn to name, explain and use mathematical concepts in Chinese.",
            "High school | Greater depth | Content becomes more demanding and Chinese is used to justify steps, present solutions and structure reasoning.",
            "Method | Thinking in another language | Changing language forces students to clarify steps and build more precise thinking."
          ],
          teaching_methods: ["Introduce specialised vocabulary progressively.", "Ask students to verbalise problem-solving steps.", "Connect mathematical rigour with linguistic precision."],
          higher_education: "This approach strengthens profiles able to work in scientific and international contexts."
        },
        "connaissance-monde": {
          name: "World",
          title: "Connaissance du monde",
          description: "In high school, Connaissance du monde invites students to discover the world in Chinese, with different references and perspectives.",
          target: "1ère and Terminale students at Lycée Émile Zola.",
          advantages: ["Intercultural perspective", "Analysis of society and contemporary issues", "Argued oral expression"],
          stage_details: [
            "1ère-Terminale | Opening perspectives | Students use Chinese to observe societies, cultures, contemporary issues and the circulation of ideas.",
            "Method | Comparing viewpoints | The course helps students understand that the same question can be read differently through different languages, histories and references.",
            "Production | Presenting and arguing | Students learn to organise presentations, defend an analysis and enrich general culture."
          ],
          teaching_methods: ["Work from documents, examples, images, debates and presentations.", "Develop comparative thinking between Chinese, French and international contexts.", "Use Chinese as a language for analysing the real world."],
          higher_education: "Connaissance du monde supports pathways in international relations, politics, business, languages, humanities and dual degrees."
        },
        "avenir": {
          name: "Future",
          title: "After high school: build an international profile",
          description: "The SIC programme helps students turn bilingual skills, academic demand and international perspective into higher-education strengths.",
          target: "High school students and families preparing post-baccalaureate choices.",
          advantages: ["A valuable bilingual profile", "International cultural knowledge", "Autonomy and analytical ability"],
          stage_details: [
            "Skills | Language, method and culture | Students can highlight the ability to learn, think and express themselves across languages and references.",
            "Orientation | France and abroad | The programme supports university, preparatory classes, dual degrees, schools, mobility and international programmes.",
            "Personal project | Standing out | SIC gives students material to explain their path, commitments, cultural curiosity and capacity for work."
          ],
          teaching_methods: ["Help students identify transferable skills developed in the programme.", "Connect learning with study projects and mobility.", "Value the ability to compare, explain and argue in an international setting."],
          higher_education: "After the baccalaureate, SIC can support linguistic, scientific, economic, legal, political, cultural and international pathways."
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

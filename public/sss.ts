const resources = {
  kz: {
    translation: {
      greeting:
        "«Алматы Ұстазы - 2023» жас мұғалімдердің кәсіби байқауына шақырамыз! ",
      accept: "Жеке деректерімді өңдеу саясатымен келісемін",
      Hod: "Байқаудық барысы",
      ready: "Дайындық кезеңі: ",
      register: "Тіркелу жабық",
      type: "Email енгізіңіз",
      speakers: "Спикерлер",
      stages: "Байқау кезеңдері",
      prize: "Жүлделер",
      participate: "Қатысушы болу",
      login: "Кіру",
      logout: "Шығу",
      personal: "Жеке кабинет",
      first: "20 наурыз – 30 наурыз: байқау платформасында онлайн тіркеу",
      second:
        "30 наурыз. Онлайн-конференция. Байқаудың бірінші кезеңінің мақсаты, міндеттері және бағалау критерийлері.",
      third: "7-14 сәуір: Байқау платформасына мультимедиялық мақаланы жүктеу",
      fourth:
        "17-26 сәуір. Мультимедиялық мақалаларды Сараптау комиссиясының бағалау күндері.",
      fifth: "26 сәуір. I кезеңнің қорытындысы платформада жарияланады",
      important: "Маңызды мәселе!",
      attention: "Назар аударыңыз!",
      attentionFirst:
        "Мультимедиялық мақаланың мәтінінде педагогтер өз пәні шеңберінде тиімді оқыту мен тәрбиелеу принциптері негізделген философиялық көзқарастарын, педагогикалық ұстанымын сипаттайды (мақаланың мазмұны бағаланады).",
      attSecond:
        "Мақаланың мультимедиялық  көрсетілімінде аудио, бейне, графикалық, мәтіндік және/немесе басқа сандық ресурстар үйлесімді қолданылу қажет (мақаланың мультимедиялық берілуі бағаланады).",
      attThird:
        "Мақалада педагогтің соңғы 3 жылдағы білім беру қызметіндегі жеке кәсіби жетістіктері, оқушыларды оқыту, тәрбиелеу және дамытудың нәтижелері, мектептің, қаланың білім беру жүйесін дамытуға қосқан үлесі міндетті түрде қамтылуы тиіс.",
      importantFirst:
        "Әрбір педагогтің жұмысын 3 (үш) сарапшы бағалайды (ғалым, әдіскер, мұғалім).",
      impSecond:
        "Бастауыш білім беру және әрбір оқу пәні бойынша жұмыстары ең жоғары баллға ие болған 8 (сегіз) педагог байқаудың екінші кезеңіне өтеді.",

      secondStage: "II кезең - «Мен кәсіби мұғаліммін»: 28 сәуір - 12 мамыр.",
      secondStageFirst:
        "28 сәуір. Онлайн-конференция. Байқаудың екінші кезеңінің мақсаты, міндеттері және бағалау критерийлері.",
      secondStageSecond: "2 - 12 мамыр: ",
      secondStageThird:
        "Байқауға қатысушылар Сараптамалық кеңес мүшелерінің қатысуымен сабақ өткізеді",
      secSecond: "Сабақтың ұзақтығы – ",
      minute: "45 минут.",
      importantSecond:
        "Әрбір пәннің Сараптамалық кеңесі байқаудың I және II кезеңдерінің қорытындысымен байқаудың III кезеңіне өтетін 11 финалистті (әрбір  пәннен 1 педагог) анықтайды.",
      attentionSecond:
        "Сабақта педагогтің «Менің білім беру философиям» тақырыбындағы мультимедиялық мақалада сипаттаған білім берудің философиялық негіздемесі мен педагогикалық ұстанымы көрініс табуы тиіс. ",
      attSeco:
        "Әрбір педагогтің сабағын 3 (үш) сарапшы бағалайды (ғалым, әдіскер, мұғалім). Сабақтың жазбасы байқаудың Youtube арналарында орналастырылады.",
      final: "17 мамыр. Финалға шыққан педагогтер платформада жарияланады.",
      thirdStageOne:
        "III кезең - «Мен мұғалім-көшбасшымын»: \n13 қыркүйек – 22 қыркүйек",
      thirdStageTwo:
        "13 қыркүйек. Онлайн-конференция. Байқаудың үшінші кезеңінің мақсаты, міндеттері және бағалау критерийлері.",
      thirdStageThree:
        "19-22 қыркүйек. \n1. Финалға шыққан әрбір педагог «Мен мұғалім-көшбасшымын» атты авторлық шеберлік сағатын өткізеді. \n2. Алматы қаласы Білім басқармасы басшысының қатысуымен «Заманауи білім берудің өзекті міндеттері» тақырыбындағы дөңгелек үстел – панельдік пікірталас. \nШеберлік сағатына әрбір педагогке берілетін уақыт - 30 минутқа дейін.",
      thirdStageFour:
        "Шеберлік сағатының мазмұны алдыңғы I және II кезеңнің мазмұнынан туындауы тиіс. Яғни, шеберлік сағатында педагог байқаудың I кезеңдегі «Менің білім беру философиям» мультимедиялық мақалада жариялаған білім берудің философиялық негіздемесі мен педагогикалық ұстанымын қорғайды, бұл философияның II кезеңдегі  «Мен кәсіби мұғаліммін» айдарымен өткізілген сабақтағы қолданыс тапқанын көрсетеді және педагогикалық ұстанымының нәтижелілігін 3 жылдағы білім беру қызметіндегі жеке кәсіби жетістіктері, оқушыларды оқыту, тәрбиелеу және дамытудың нәтижелері, мектептің, қаланың білім беру жүйесін дамытуға қосқан үлесі арқылы дәлелдейді. ",
      thirdStageFive:
        "«Заманауи білім берудің өзекті міндеттері» дөңгелек үстел – панельдік пікірталаста педагогтердің білім берудің өзекті мәселелерін сезінуі, оларды шешу бойынша айтқан пікірлерінің дәйектілігі бағаланады. \nПедагогтердің шеберлік сағаттары мен дөңгелек үстелде айтқан пікірлерін  барлық 11 пәннің Сарапшылары бірге отырып бағалайды",
      thirdStageSix:
        "ІІІ кезеңнің қорытындысы бойынша байқаудың жалпы қорытындысы шығады: Гран - при (1); I орын (1); II орын (1); III орын (2). Барлығы – 5 жеңімпаз анықталады.",
      thirdStageSeven:
        "Байқау шарттарымен таныссаң қатысуға асық! Ұстаздың құтты білігінен шәкірттің құнды біліміне жеткізер жолды көрсет!",
      give: "Қатысуға өтінім беру",
      now: "Дәл қазір тіркел!",
      fast: "2023 жылдың 30 наурызыңа дейін тіркелуге және қатысуға өтінім беруге асығыңыз",
      create: "Байқауды ұйымдастырушы",
      almaty: "Алматы қаласының Білім басқармасы",
      contact: "Байланыс деректері",
      come: "Қатысуға шақырамыз",
      age: "Конкурсқа Алматы қаласының мемлекеттік білім беру ұйымдарындағы оқу жоспарының барлық пәндері бойынша 36 жасқа дейін қоса алғанда 1-11 сынып мұғалімдері қатыса алады",
      wifi: "электрондық тіркеуден өтіп, сауалнаманы толтырыңыз",
      down: "түйіндемені, фотосуретті және еңбек өтілі көрсетілген жұмыс орнынан анықтаманың скан-көшірмесін жүктеңіз",
      like: "академиялық адалдық қағидаттарын сақтаңыз",
      birth: "Туған күніңізді енгізіңіз",
      send: "Жіберу",
      degree: "Біліктілік санаты",
      school: "Жұмыс орны",
      subject: "Оқытылатын пән",
      time: "Жалпы педагогикалық еңбек өтілі(жылдар)",
      current: "Осы мектептегі жұмыс өтілі(жылдар)",
      english: "Ағылшын тілін білуі",
      language: "Оқыту тілі",
      yes: "Иә",
      no: "Жоқ",
      password: "Құпия сөз",
      writePassword: "Құпия сөзді енгізіңіз",
      writeNickname: "Логин енгізіңіз",
      surname: "Тегі",
      name: "Аты",
      middle: "Әкесінің аты",
      full: "ТАӘ",
      birthday: " Туған күніңіз",
      mainPage: "Басты бетке өту",
      profilePage: "Профильге өту",
      more: "Толықтыру",
      work: "Мультимедиялық мақаланы жүктеу",
      olymp: "Конкурсқа тіркелу",
      link: "3. Мультимедиялық мақаланың сілтемесін енгізіңіз немесе файлды жүктеңіз",
      or: "Немесе",
      errorSend: "Жіберілген жоқ, қайтадан көріңіз",
      form: "1. Өтінімнің құрылымын(мысалын) жүктеңіз ",
      form1: "2. Өтінімді жіберіңіз",
      clickKaz: "Қазақша нұсқасын жүктеп алу үшін басыңыз",
      clickRus: "Орыс нұсқасын жүктеп алу үшін басыңыз",
      formLink: "Мультимедиялық мақаланың сілтемесі",
      race: "Жарыстың финалы",
      x: "марапаттау салтанаты",
      firstPlace: "1-ші орын",
      secondPlace: "1-5 орын",
      thirdPlace: "5 финалист",
      grand: "Гран-при иегері 5 000 000 теңгенің сертификатымен марапатталады.",
      know: "«Білім берудегі жаңа технологиялар» саласы бойынша әлемдік қауымдастық мойындаған оқу орнында оқу тағылымдамасы",
      almatys:
        "Алматы қаласы Білім басқармасының басшысымен панельдік пікірталасқа қатысады",
      screen:
        "Әр кезең интенсивінен өткен барлық педагогтер қатысушы сертификатын алады",
      richard:
        "Білім берудегі цифрлық технологиялармен айналысатын АҚШ-тың ең ірі компаниясының ISTE директоры",
      che: "Дұрыс енгізілген жоқ, қайтадан көріңіз",
      san: "Сан енгізіңіз",
      olympReg: "Нысан бойынша форманы толтыру",
      news: "Жаңалықтар",
      plan: "Оқу жоспарлары",
      read: "Оқу",
      readMore: "Сұрактар болса, осы телеграм каналына жазыңыз:",
      latin: "Латын алфавитін қолдану",
      kaz: "Қазақ алфавитін қолдану",
      main: "Басты бет",
      kz: "Қазақша",
      ru: "Орысша",
      nysan: "Мультимедиялық мақаланы жүктеу",
      sss: "(форманы толтыру үшін басты бетке өтіңіз)",
      noNews: "Жаңалықтар әзірге жоқ",
      errLogin: "Қате логин немесе пароль",
      exist: "Бұл логин қолданыста бар, басқасын көріңіз",
      firstName: "Аты",
      lastName: "Тегі",
      middleName: "Әкесінің аты",
      forgot: "Құпия сөзді ұмыттыңыз ба?",
      email: "Email енгізіңіз",
      reset: "Құпия сөзді қалпына келтіру",
      change: "Өзгерістер енгізу үшін Тольқтыру батырмасын басыңыз",
      obj: "Почтаны тексеріңіз",
      write: "Жаңа құпия сөзді енгізіңіз",
      support: "Телефон арқылы жұмыс жасамайды, компьютер арқылы кіріңіз",
      finish: "Барлық файлдар жіберілді - сіз аяқтадыңыз",
      finishs: "Аяқтау",
      file: "Файлды таңдаңыз",
      linkPresentation: "Мультимедиялық мақаланың сілтемесі",
      linkArticle: "Мәтіндік мақаланың сілтемесі",
      article:
        "4. Мәтіндік Мақала сілтемесін енгізіңіз немесе файлды жүктеңіз. (Қалау бойынша)",
      skip: "Өткізіп жіберу",
      next: "Келесі",
      res: "Қайтадан жіберу",
      back: "Артқа",
      step: "Қадам",
      of: "ден",
      if: "Қалау бойынша, егер болса",
      question1: "Өтінім жіберілген:",
      question2: "Мультимедиялық мақала жіберілген:",
      question3: "Мәтіндік мақала жіберілген:",
      click: "тексеру үшін басыңыз",
      total1: "1 кезеңнің бағасы",
      criteria: "Бағалау критерийлері",
    },
  },

  ru: {
    translation: {
      greeting:
        "Приглашаем на профессиональный конкурс молодых учителей «Алматы Ұстазы - 2023»!",
      accept: "Согласен с политикой обработки личных данных",
      hod: "Ход проведения конкурса",
      register: "Регистрация закрыта",
      type: "Введите Email",
      ready: "Подготовительный период:",
      speakers: "Спикеры",
      stages: "Этапы конкурса",
      prize: "Призы",
      participate: "Участвовать",
      login: "Войти",
      logout: "Выйти",
      personal: "Личный кабинет",
      first: "С 20 марта – 30 марта: онлайн регистрация на платформе конкурса",
      second:
        "30 марта. Онлайн-конференция. Цели, задачи и критерии оценки первого этапа",
      third:
        "С 7-14 апреля: Загрузка мультимедийной статьи на  платформу конкурса",
      fourth:
        "С 17-26 апреля - экспертиза и оценка мультимедийной статьи (экспертной комиссией).",
      fifth: "26 апреля - итоги I этапа объявляется на платформе конкурса.",
      important: "Важно!",
      attention: "Внимание!",
      attentionFirst:
        "В содержании статьи участники описывают свое философское обоснование и педагогическую концепцию эффективного обучения и воспитания в рамках собственного предмета (оценивается содержание статьи). ",
      attSecond:
        "Содержание материала должно быть представлено в формате мультимедийной статьи с применением доступных (в том числе, собственных) аудио, видео-графических, текстовых или иных цифровых ресурсов (оценивается мультимедийные составляющие статьи).",
      attThird:
        " В качестве подтверждения, статья конкурсанта должна обязательно содержать личные профессиональные достижения в образовательной деятельности, результаты обучения и воспитания и развития учащихся, вклад педагога в развитие системы образования школы, города за последние 3 года",
      importantFirst:
        "Работу каждого педагога оценивают 3 (три) эксперта (ученый, методист, учитель).",
      impSecond:
        "8 (восемь) участников (по начальному образованию и по  каждому учебному предмету) работы которых удостоены наибольшего балла, проходят на второй этап конкурса.",

      secondStage: "II этап - «Я учитель - профессионал»: 28 апреля - 12 мая.",
      secondStageFirst:
        "28 апреля. Онлайн-конференция. Цели, задачи и критерии оценки второго этапа",
      secondStageSecond: "Со 2 мая - 12 мая: ",
      secondStageThird:
        "Участники конкурса проводят урок с учащимися другой школы в присутствии членов экспертного совета.",
      secSecond: "Продолжительность урока - ",
      minute: "45 минут.",

      importantSecond:
        "Экспертный совет по каждому учебному предмету по результатам  I и II этапов определяет 11 финалистов (1 победитель по каждому предмету) которые проходят на III этап конкурса.",
      attentionSecond:
        "На уроке должны отражаться философское обоснование и педагогическая концепция описанные в мультимедийной статье.",
      attentionThird:
        "Урок каждого педагога оценивают 3 (три) эксперта (ученый, методист, учитель).",
      attFourth: "Урок транслируется на видеохостинг YouTube.",
      final:
        "17 мая - педагоги прошедшие в финал объявляются на платформе конкурса ",

      thirdStageOne:
        "III этап - «Я – учитель-лидер»: с 13 сентября – 22 сентября",
      thirdStageTwo:
        "13 сентября. Онлайн-конференция. Цели, задачи и критерии оценки третьего этапа",
      thirdStageThree:
        "С 19 - 22 сентября. \n1. Каждый педагог вышедший на финал проводит «Мастер-класс: «Я – учитель-лидер» \n2. С участием руководителя Управления образования г. Алматы проводится панельная дискуссия: «Актуальных задач современного образования». \nВремя проведения мастер-класса каждого педагога – до 30 минут. ",
      thirdStageFour:
        "Содержание мастер-класса должно вытекать от содержаний I и II туров. То есть, на мастер-классе педагог защищает свое философское обоснование и педагогическую концепцию изложенные в мультимедийной статье «Моя философия образования» I тура, показывает отражение данной философий на своем уроке «Я учитель - профессионал» II тура и доказывает результативность педагогической концепций через личные профессиональные достижения в образовательной деятельности, результаты обучения и воспитания и развития учащихся, вклад педагога в развитие системы образования школы, города за последние 3 года.",
      thirdStageFive:
        "На круглом столе - панельная дискуссия «Актуальных задач современного образования» оцениваются чувствие участником  актуальных задач современного образования, обоснованность идей по решению поставленных задач.Мастер-класс и выступление педагога на круглом столе - панельной дискуссий оценивают все эксперты 11 предметов конурса.По итогам ІІІ этапа конкурса и будут определены:Гран - при (1); I место (1); II место (1); III место (2). Всего – 5 победителя конкурса.",
      thirdStageSix:
        "По итогам III этапа подводятся общие итоги конкурса: Гран - при (1); I место (1); II место (1); III место (2). Всего-5 победителей.",
      thirdStageSeven:
        "Если ознакомились с условиями конкурса торопитесь участвовать! Ұстаздың құтты білігінен шәкірттің құнды біліміне жеткізер жолды көрсет!",
      give: "Подача заявки на участие",
      now: "Зарегистрируйтесь прямо сейчас!",
      fast: "Заявка на регистрацию и участие до 30 марта 2023 года спешите отдать",
      create: "Организатор конкурса",
      almaty: "Управление образования города Алматы",
      contact: "Контактные данные",
      come: "Приглашаем принять участие",
      age: "В конкурсе могут принять участие учителя 1-11 классов по всем предметам учебного плана в государственных организациях образования города Алматы до 36 лет включительно",
      wifi: "пройдите электронную регистрацию и заполните анкету",
      down: "скачать резюме, фото и скан-копию справки с места работы с указанием стажа работы",
      like: "соблюдайте принципы академической честности",
      birth: "Дата рождения",
      send: "Отправить",
      degree: "Квалификационная категория ",
      school: "Место работы",
      subject: "Преподоваемый предмет",
      time: "Общий педагогический стаж(лет)",
      current: "Стаж работы в данной школе(лет)",
      english: "Знание английского языка",
      language: "Язык обучения",
      yes: "Да",
      no: "Нет",
      password: "Пароль",
      writePassword: "Введите пароль",
      writeNickname: "Введите никнейм",
      name: "Введите имя",
      surname: "Введите фамилию",
      middle: "Введите отчество",
      full: "ФИО",
      birthday: "Дата рождения",
      mainPage: "Перейти на главную страницу",
      profilePage: "Перейти в профиль",
      more: "Дополнить",
      work: "Отправить презентацию",
      olymp: "Регистрация на Конкурс",
      link: "3. Вставьте ссылку презентаций либо загрузите ее.",
      or: "или",
      errorSend: "Ошибка отправки",
      form: "1. Cкачайте заявку по форме ",
      form1: "2. Отправить заявку по форме",
      clickKaz: "Нажмите чтобы скачать казахскую версию",
      clickRus: "Нажмите чтобы скачать русскую версию",
      formLink: "Ссылка на презентацию",
      race: "Финал соревнований",
      x: "церемония награждения",
      firstPlace: "1-е место",
      secondPlace: "1-5 место",
      thirdPlace: "5 финалистов",
      grand:
        "Обладатель Гран-при награждается сертификатом на сумму 5 000 000 тенге.",
      know: "Учебная стажировка в учебном заведении, признанном мировым сообществом в области новые технологии в образовании»",
      almatys:
        "Участвует в панельной дискуссии с руководителем Управления образования города Алматы",
      screen:
        "Все педагоги, прошедшие интенсив каждого этапа, получают сертификат участника",
      richard:
        "Самые популярные в США цифровые технологии в образовании директор крупнейшей компании ISTE",
      che: "Напишите корректный email",
      san: "Напишите число",
      olympReg: "Заполнили форму",
      news: "Новости",
      plan: "Учебные планы",
      read: "Читать",
      readMore: "Если есть вопросы, пишите на этот телеграм канал:",
      latin: "используйте латинский алфавит",
      kaz: "используйте казахский алфавит",
      main: "Главная",
      kz: "Казахский",
      ru: "Русский",
      nysan: "отправить мультимедийную статью",
      sss: "(перейдите на главную страницу, чтобы заполнить форму)",
      noNews: "Новостей еще нет",
      errLogin: "Неправильный логин или пароль",
      exist: "Такой пользователь уже существует",
      firstName: "Имя",
      lastName: "Фамилия",
      middleName: "Отчество",
      forgot: "Забыли пароль?",
      email: "Введите Email ",
      reset: "Сбросить пароль",
      change: "Нажмите кнопку Дополнить, чтобы внести изменения",
      obj: "Проверьте почту",
      write: "Введите новый пароль",
      support:
        "Ваше устройство не поддерживается, пожалуйста, используйте компьютер",
      finish: "Все файлы отправлены - вы закончили",
      file: "Выберите файл",
      linkPresentation: "Ссылка на презентацию",
      linkArticle: "Ссылка на статью",
      article: "4. Вставьте ссылку статьи либо загрузите ее. (Необязательно).",
      skip: "Пропустить",
      next: "Далее",
      res: "Отправить сначала",
      back: "Назад",
      finishs: "Завершить",
      step: "Шаг",
      of: "из",
      if: "Необязательно, если есть",
      question1: "Форма по заявке отправлена:",
      question2: "Презентация отправлена:",
      question3: "Статья отправлена:",
      click: "Нажмите, чтобы проверить",
      total1: "Результаты 1 этапа",
      criteria: "Критерии оценивания",
    },
  },
};

export default resources;

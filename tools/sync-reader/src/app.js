const iconHref = (id) => `#${id}`;
const iconSvg = (id) => `<svg class="icon" aria-hidden="true"><use href="${iconHref(id)}"></use></svg>`;
const textFormat = window.SyncReaderTextFormat;

const i18n = {
  ru: {
    appTitle: "Sync Reader",
    reading: "Чтение", wordReview: "Слова", rules: "Правила", rulesTitle: "Немецкая грамматика A1-B1", stats: "Статистика", about: "О проекте", library: "Библиотека", searchTexts: "Поиск текстов...",
    addTexts: "Добавить текст", collapseLibrary: "Свернуть библиотеку", libraryDropHint: "Перетащите сюда .txt файлы или папку", actions: "Действия",
    settings: "Настройки", uiLanguage: "Язык интерфейса", theme: "Тема", themeAuto: "Авто", themeLight: "Светлая", themeDark: "Тёмная", textSize: "Размер текста",
    serifFont: "Шрифт с засечками", showSavedWords: "Подсвечивать сохранённые слова", zenMode: "Режим фокуса", swapTexts: "Поменять колонки местами",
    deleteText: "Удалить", russian: "Русский", german: "Немецкий",
    newWords: "Учу сейчас", studyCurrent: "Учить слова этого текста", studyAll: "Учить все слова из «Учу сейчас»", studyDue: "Повторить", studyArchive: "Учить все слова подряд",
    copyAnki: "Скопировать TSV для Anki", downloadAnki: "Скачать TSV для Anki", clearLearning: "Очистить «Учу сейчас»", clearLearningConfirm: "Убрать все слова из «Учу сейчас»? В списке «Все слова» они останутся.",
    archive: "Все слова", restoreArchive: "Вернуть все слова в изучение", searchWords: "Поиск слов...",
    archiveHint: "Все слова, которые вы когда-либо сохраняли. Выученные карточки сами возвращаются в повторение, когда подходит срок.", noArchive: "Здесь появятся все сохранённые слова.",
    dueNow: "пора повторить", learningNow: "учу сейчас", nextReview: "повтор через {when}", moreContexts: "ещё предложений: {count}", removeFromLearning: "Убрать из «Учу сейчас»", restoreOne: "Вернуть в изучение", deleteWord: "Удалить слово", deleteWordConfirm: "Удалить «{word}» насовсем?",
    generator: "Добавить тексты", saveToFolder: "Сохранить в папку", folderAuto: "Автоматически (по уровню)",
    importFilesTitle: "У меня уже есть файл", fileDropTitle: "Перетащите .txt файлы или целую папку", fileDropHint: "Папка станет папкой в библиотеке. Можно сразу несколько файлов. Перетаскивать можно в любое место приложения.", chooseFiles: "Выбрать файлы", chooseFolder: "Выбрать папку",
    aiTitle: "Создать новый текст с ИИ", aiStep1: "Опишите текст", aiStep2: "Скопируйте промпт в Claude, ChatGPT или Gemini", aiStep3: "Вставьте ответ ИИ целиком и сохраните",
    topic: "Тема или исходный текст", level: "Уровень", textLength: "Объём текста", lengthShort: "Короткий (~150 слов)", lengthMedium: "Средний (~300 слов)", lengthLong: "Длинный (~500 слов)", lengthXLong: "Очень длинный (~800 слов)",
    textStyle: "Жанр", styleStory: "История", styleNews: "Новость", styleDialogue: "Диалог", styleArticle: "Статья", moreOptions: "Дополнительно",
    focusWords: "Слова, которые нужно использовать (необязательно)", focusWordsHint: "Например: der Termin, verschieben, pünktlich", useMyWords: "Подставить мои слова для изучения",
    storyContext: "Продолжение истории (необязательно)", storyContextHint: "Вставьте сюда предыдущую главу, краткое содержание или описание героев.",
    extraInstructions: "Свои пожелания к ИИ (необязательно)", extraInstructionsHint: "Например: больше разговорных фраз, герою 30 лет, действие в Берлине.", grammarNotes: "Подробные грамматические подсказки",
    showPrompt: "Показать промпт", copyPrompt: "Скопировать промпт", importJson: "Сохранить текст", importFailed: "Текст не распознан.", noSentencesFound: "В тексте не найдено ни одного предложения DE:/RU:.",
    previewCounts: "{paragraphs} абз. · {sentences} предл. · {words} слов", previewNoWarnings: "Все слова связаны, предупреждений нет.", previewReplaces: "Такой текст уже есть, он будет обновлён.",
    noTextFiles: "Не найдено .txt или .json файлов.", fileUnreadable: "Не удалось прочитать файл.", filesImported: "Импортировано текстов: {count}.", filesImportedSomeFailed: "Импортировано: {count}, с ошибками: {failed}.",
    dropHere: "Отпустите, чтобы импортировать тексты",
    showAnswer: "Показать ответ", again: "Снова", hard: "Трудно", good: "Хорошо", easy: "Легко",
    noWords: "Нажмите на слово или фразу в тексте, чтобы сохранить его вместе с предложением.", noStudy: "Сейчас нечего повторять.", done: "Сессия завершена.", leftInQueue: "осталось: {count}",
    unitMin: "мин", unitHour: "ч",
    hide: "Скрыть", show: "Показать", copiedPrompt: "Промпт скопирован. Вставьте его в чат с ИИ.", imported: "Текст сохранён в библиотеку.",
    noTexts: "В библиотеке нет текстов.", folder: "Папка", newFolder: "Новая папка", unfiled: "Без папки", cancel: "Отмена", save: "Сохранить", folderEmpty: "Пусто: перетащите сюда тексты",
    renameFolder: "Переименовать папку", deleteFolder: "Удалить папку", addToFolder: "Добавить текст в папку", folderName: "Название папки", folderAdded: "Папка добавлена.", folderRenamed: "Папка переименована.", folderDeleted: "Папка удалена. Тексты оставлены без папки.",
    renameLibraryText: "Переименовать текст", moveLibraryText: "Переместить в папку", exportText: "Скачать как .txt", textName: "Название текста", textRenamed: "Текст переименован.", textMoved: "Текст перемещён.", deleteTextConfirm: "Удалить этот текст из локальной библиотеки?", deleteFolderConfirm: "Удалить папку? Тексты останутся в библиотеке без папки.",
    aboutTitle: "О Sync Reader", aboutIdea: "Sync Reader был разработан на основе моей личной идеи читать больше. Мне понравился формат параллельных переводов в книгах, и я решил повторить его в удобном приложении, где смогу добавить любой текст по своему желанию.",
    aboutContext: "Главная идея - смотреть слово сразу в контексте предложения, а не только иметь прямой перевод слова. Либо можно сначала прочитать текст на родном языке, а потом на изучаемом. Тогда легче будет понимать текст.",
    aboutStudy: "По словам можно кликать, сохраняя их во время чтения, потом повторять в стиле Anki или скачать готовый TSV-файл для импорта в Anki.",
    aboutPet: "Это pet project. Больше заметок о разработке:",
    deleted: "Текст удалён.", copiedAnki: "TSV скопирован.", downloaded: "TSV скачан.", mappingWarnings: "Предупреждения связей",
    statDue: "К повторению сейчас", statActive: "Учу сейчас", statArchive: "Всего слов", statStudied: "Изучались", statReads: "Прочтений за 7 дней", statTexts: "Текстов",
    readProgress: "Прогресс по текстам", readProgressHint: "После каждого прочтения нажмите «Закончить чтение» внизу текста. Здесь видно, сколько слов было незнакомо в каждом прочтении.", noReads: "Пока нет завершённых прочтений.",
    colText: "Текст", colReads: "Прочтений", colFirst: "Первое", colLast: "Последнее", colTrend: "Динамика", colDate: "Дата",
    dataTitle: "Данные", dataHint: "Всё хранится только в этом браузере. Сделайте резервную копию, чтобы не потерять библиотеку и слова.", exportBackup: "Скачать резервную копию", importBackup: "Восстановить из копии",
    backupSaved: "Резервная копия скачана.", backupInvalid: "Это не резервная копия Sync Reader.", backupConfirm: "Заменить все текущие данные данными из копии?", dangerZone: "Опасная зона",
    studyCurrentShort: "Учить", resetLocalData: "Сбросить все локальные данные", resetConfirm: "Удалить все локальные тексты, слова, статистику и настройки Sync Reader?", resetDone: "Локальные данные удалены.",
    popSaved: "Сохранено в карточках", popClickToSave: "Клик — отметить как незнакомое", popTapToSave: "Нажмите — отметить как незнакомое",
    unknownThisRead: "незнакомых", sessionChipTitle: "Незнакомые слова в этом прочтении",
    toastSaved: "Сохранено: {word} — {translation}", toastUnmarked: "Отметка снята: {word}", toastMarkedAgain: "Снова незнакомо: {word}. Карточка вернётся в повторение.", toastBackToLearning: "{word} снова в изучении",
    toastReadSaved: "Прочтение сохранено: незнакомых слов {count}.", toastReadSavedCompare: "Прочтение сохранено: незнакомых слов {count} (в прошлый раз {previous}).",
    finishTitle: "Конец текста", finishSummary: "В этом прочтении отмечено незнакомых слов: {count} из {total} ({percent}%).", finishReading: "Закончить чтение и сохранить результат", discardMarks: "Сбросить отметки",
    finishHint: "Нажимайте на слова, которые не знаете. После сохранения следующее прочтение начнётся с чистого листа, а результат появится в статистике.", thisRead: "Сейчас", previousReads: "Прошлые прочтения", deleteRead: "Удалить это прочтение", readDeleted: "Прочтение удалено.", deleteTextReads: "Удалить историю прочтений этого текста", deleteTextReadsConfirm: "Удалить все сохранённые прочтения этого текста? Карточки останутся.",
    lastUnknown: "последнее: {count} незн.", inProgress: "читаю: {count} незн.",
    sections: "Разделы", search: "Поиск", noResults: "Ничего не найдено", zenExit: "Выйти из режима фокуса", hiddenSuffix: "скрыто", emptyReader: "Выберите текст в библиотеке",
    statusParagraph: "абзац {n} из {m}", statusMarked: "отмечено {count}", finishReadingShort: "Завершить чтение", openText: "Открыть", rename: "Переименовать", moveTo: "Переместить в", deleteTextMenu: "Удалить…", deleteFolderMenu: "Удалить папку…",
    showLibrary: "Показать библиотеку", hideLibrary: "Скрыть библиотеку", resizeLibrary: "Изменить ширину библиотеки",
    textsUnit: { one: "текст", few: "текста", many: "текстов", other: "текста" },
    cardsUnit: { one: "карточка", few: "карточки", many: "карточек", other: "карточки" },
    wordsUnit: { one: "слово", few: "слова", many: "слов", other: "слова" },
    daysUnit: { one: "день", few: "дня", many: "дней", other: "дня" },
    readsUnit: { one: "прочтение", few: "прочтения", many: "прочтений", other: "прочтения" }
  },
  de: {
    appTitle: "Sync Reader",
    reading: "Lesen", wordReview: "Wörter", rules: "Regeln", rulesTitle: "Deutsche Grammatik A1-B1", stats: "Statistik", about: "Über", library: "Bibliothek", searchTexts: "Texte suchen...",
    addTexts: "Text hinzufügen", collapseLibrary: "Bibliothek einklappen", libraryDropHint: ".txt-Dateien oder einen Ordner hierher ziehen", actions: "Aktionen",
    settings: "Einstellungen", uiLanguage: "Sprache der Oberfläche", theme: "Design", themeAuto: "Auto", themeLight: "Hell", themeDark: "Dunkel", textSize: "Textgröße",
    serifFont: "Serifenschrift", showSavedWords: "Gespeicherte Wörter markieren", zenMode: "Fokusmodus", swapTexts: "Spalten tauschen",
    deleteText: "Löschen", russian: "Russisch", german: "Deutsch",
    newWords: "Lerne gerade", studyCurrent: "Wörter dieses Textes lernen", studyAll: "Alle Wörter aus „Lerne gerade“ lernen", studyDue: "Wiederholen", studyArchive: "Alle Wörter lernen",
    copyAnki: "TSV für Anki kopieren", downloadAnki: "TSV für Anki laden", clearLearning: "„Lerne gerade“ leeren", clearLearningConfirm: "Alle Wörter aus „Lerne gerade“ entfernen? In „Alle Wörter“ bleiben sie erhalten.",
    archive: "Alle Wörter", restoreArchive: "Alle Wörter wieder lernen", searchWords: "Wörter suchen...",
    archiveHint: "Alle Wörter, die du je gespeichert hast. Gelernte Karten kommen automatisch zur Wiederholung zurück, wenn sie fällig sind.", noArchive: "Hier erscheinen alle gespeicherten Wörter.",
    dueNow: "fällig", learningNow: "lerne gerade", nextReview: "Wiederholung in {when}", moreContexts: "weitere Sätze: {count}", removeFromLearning: "Aus „Lerne gerade“ entfernen", restoreOne: "Wieder lernen", deleteWord: "Wort löschen", deleteWordConfirm: "„{word}“ endgültig löschen?",
    generator: "Texte hinzufügen", saveToFolder: "In Ordner speichern", folderAuto: "Automatisch (nach Niveau)",
    importFilesTitle: "Ich habe schon eine Datei", fileDropTitle: ".txt-Dateien oder einen ganzen Ordner hierher ziehen", fileDropHint: "Ein Ordner wird zum Bibliotheksordner. Mehrere Dateien gehen auch. Du kannst überall in der App ablegen.", chooseFiles: "Dateien wählen", chooseFolder: "Ordner wählen",
    aiTitle: "Neuen Text mit KI erstellen", aiStep1: "Text beschreiben", aiStep2: "Prompt in Claude, ChatGPT oder Gemini kopieren", aiStep3: "Ganze KI-Antwort einfügen und speichern",
    topic: "Thema oder Ausgangstext", level: "Niveau", textLength: "Textlänge", lengthShort: "Kurz (ca. 150 Wörter)", lengthMedium: "Mittel (ca. 300 Wörter)", lengthLong: "Lang (ca. 500 Wörter)", lengthXLong: "Sehr lang (ca. 800 Wörter)",
    textStyle: "Genre", styleStory: "Geschichte", styleNews: "Nachricht", styleDialogue: "Dialog", styleArticle: "Artikel", moreOptions: "Weitere Optionen",
    focusWords: "Wörter, die vorkommen sollen (optional)", focusWordsHint: "Zum Beispiel: der Termin, verschieben, pünktlich", useMyWords: "Meine Lernwörter einsetzen",
    storyContext: "Fortsetzung einer Geschichte (optional)", storyContextHint: "Füge hier das vorige Kapitel, eine Zusammenfassung oder die Figuren ein.",
    extraInstructions: "Eigene Wünsche an die KI (optional)", extraInstructionsHint: "Zum Beispiel: mehr Umgangssprache, Handlung in Berlin.", grammarNotes: "Ausführliche Grammatikhinweise",
    showPrompt: "Prompt anzeigen", copyPrompt: "Prompt kopieren", importJson: "Text speichern", importFailed: "Text nicht erkannt.", noSentencesFound: "Keine DE:/RU:-Sätze gefunden.",
    previewCounts: "{paragraphs} Abs. · {sentences} Sätze · {words} Wörter", previewNoWarnings: "Alle Wörter sind verknüpft, keine Warnungen.", previewReplaces: "Diesen Text gibt es schon, er wird aktualisiert.",
    noTextFiles: "Keine .txt- oder .json-Dateien gefunden.", fileUnreadable: "Datei konnte nicht gelesen werden.", filesImported: "Importierte Texte: {count}.", filesImportedSomeFailed: "Importiert: {count}, mit Fehlern: {failed}.",
    dropHere: "Loslassen, um Texte zu importieren",
    showAnswer: "Antwort zeigen", again: "Nochmal", hard: "Schwer", good: "Gut", easy: "Leicht",
    noWords: "Klicke auf ein Wort oder eine Phrase im Text, um es mit dem Satz zu speichern.", noStudy: "Gerade ist nichts fällig.", done: "Sitzung abgeschlossen.", leftInQueue: "übrig: {count}",
    unitMin: "Min.", unitHour: "Std.",
    hide: "Ausblenden", show: "Einblenden", copiedPrompt: "Prompt kopiert. Füge ihn in den KI-Chat ein.", imported: "Text in der Bibliothek gespeichert.",
    noTexts: "Die Bibliothek enthält keine Texte.", folder: "Ordner", newFolder: "Neuer Ordner", unfiled: "Ohne Ordner", cancel: "Abbrechen", save: "Speichern", folderEmpty: "Leer: Texte hierher ziehen",
    renameFolder: "Ordner umbenennen", deleteFolder: "Ordner löschen", addToFolder: "Text in diesen Ordner", folderName: "Ordnername", folderAdded: "Ordner hinzugefügt.", folderRenamed: "Ordner umbenannt.", folderDeleted: "Ordner gelöscht. Texte bleiben ohne Ordner.",
    renameLibraryText: "Text umbenennen", moveLibraryText: "In Ordner verschieben", exportText: "Als .txt herunterladen", textName: "Textname", textRenamed: "Text umbenannt.", textMoved: "Text verschoben.", deleteTextConfirm: "Diesen Text aus der lokalen Bibliothek löschen?", deleteFolderConfirm: "Ordner löschen? Die Texte bleiben ohne Ordner in der Bibliothek.",
    aboutTitle: "Über Sync Reader", aboutIdea: "Sync Reader wurde aus meiner persönlichen Idee heraus entwickelt, mehr zu lesen. Mir gefiel das Format paralleler Übersetzungen in Büchern, und ich wollte es in einer bequemen Anwendung nachbauen, in der ich beliebige Texte hinzufügen kann.",
    aboutContext: "Die Hauptidee ist, ein Wort sofort im Satzkontext zu sehen und nicht nur eine direkte Wortübersetzung zu haben. Alternativ kann man zuerst den Text in der Muttersprache lesen und danach in der Sprache, die man lernt. So lässt sich der Text leichter verstehen.",
    aboutStudy: "Du kannst Wörter anklicken und sie beim Lesen speichern, sie später im Anki-Stil wiederholen oder eine fertige TSV-Datei für den Import in Anki herunterladen.",
    aboutPet: "Das ist mein Pet Project. Mehr Notizen zur Entwicklung:",
    deleted: "Text gelöscht.", copiedAnki: "TSV kopiert.", downloaded: "TSV geladen.", mappingWarnings: "Verknüpfungswarnungen",
    statDue: "Jetzt fällig", statActive: "Lerne gerade", statArchive: "Wörter gesamt", statStudied: "Geübt", statReads: "Lesedurchgänge (7 Tage)", statTexts: "Texte",
    readProgress: "Fortschritt pro Text", readProgressHint: "Klicke nach jedem Lesen unten im Text auf „Lesen beenden“. Hier siehst du, wie viele Wörter bei jedem Durchgang unbekannt waren.", noReads: "Noch keine abgeschlossenen Lesedurchgänge.",
    colText: "Text", colReads: "Durchgänge", colFirst: "Erster", colLast: "Letzter", colTrend: "Verlauf", colDate: "Datum",
    dataTitle: "Daten", dataHint: "Alles liegt nur in diesem Browser. Mach eine Sicherung, damit Bibliothek und Wörter nicht verloren gehen.", exportBackup: "Sicherung herunterladen", importBackup: "Aus Sicherung wiederherstellen",
    backupSaved: "Sicherung heruntergeladen.", backupInvalid: "Das ist keine Sync-Reader-Sicherung.", backupConfirm: "Alle aktuellen Daten durch die Sicherung ersetzen?", dangerZone: "Gefahrenzone",
    studyCurrentShort: "Lernen", resetLocalData: "Alle lokalen Daten löschen", resetConfirm: "Alle lokalen Texte, Wörter, Statistiken und Sync-Reader-Einstellungen löschen?", resetDone: "Lokale Daten gelöscht.",
    popSaved: "In den Karten gespeichert", popClickToSave: "Klick: als unbekannt markieren", popTapToSave: "Tippen: als unbekannt markieren",
    unknownThisRead: "unbekannt", sessionChipTitle: "Unbekannte Wörter in diesem Durchgang",
    toastSaved: "Gespeichert: {word} — {translation}", toastUnmarked: "Markierung entfernt: {word}", toastMarkedAgain: "Wieder unbekannt: {word}. Die Karte kommt zur Wiederholung.", toastBackToLearning: "{word} wird wieder gelernt",
    toastReadSaved: "Durchgang gespeichert: {count} unbekannte Wörter.", toastReadSavedCompare: "Durchgang gespeichert: {count} unbekannte Wörter (letztes Mal {previous}).",
    finishTitle: "Ende des Textes", finishSummary: "In diesem Durchgang markiert: {count} von {total} Wörtern ({percent}%).", finishReading: "Lesen beenden und Ergebnis speichern", discardMarks: "Markierungen verwerfen",
    finishHint: "Klicke auf Wörter, die du nicht kennst. Nach dem Speichern beginnt der nächste Durchgang ohne Markierungen, das Ergebnis erscheint in der Statistik.", thisRead: "Jetzt", previousReads: "Frühere Durchgänge", deleteRead: "Diesen Durchgang löschen", readDeleted: "Durchgang gelöscht.", deleteTextReads: "Leseverlauf dieses Textes löschen", deleteTextReadsConfirm: "Alle gespeicherten Durchgänge dieses Textes löschen? Die Karten bleiben.",
    lastUnknown: "zuletzt: {count} unbek.", inProgress: "lese: {count} unbek.",
    sections: "Bereiche", search: "Suchen", noResults: "Nichts gefunden", zenExit: "Fokusmodus beenden", hiddenSuffix: "ausgeblendet", emptyReader: "Wähle einen Text in der Bibliothek",
    statusParagraph: "Absatz {n} von {m}", statusMarked: "markiert {count}", finishReadingShort: "Lesen beenden", openText: "Öffnen", rename: "Umbenennen", moveTo: "Verschieben nach", deleteTextMenu: "Löschen…", deleteFolderMenu: "Ordner löschen…",
    showLibrary: "Bibliothek einblenden", hideLibrary: "Bibliothek ausblenden", resizeLibrary: "Breite der Bibliothek ändern",
    textsUnit: { one: "Text", other: "Texte" },
    cardsUnit: { one: "Karte", other: "Karten" },
    wordsUnit: { one: "Wort", other: "Wörter" },
    daysUnit: { one: "Tag", other: "Tage" },
    readsUnit: { one: "Durchgang", other: "Durchgänge" }
  },
  en: {
    appTitle: "Sync Reader",
    reading: "Reading", wordReview: "Words", rules: "Rules", rulesTitle: "German Grammar A1-B1", stats: "Stats", about: "About", library: "Library", searchTexts: "Search texts...",
    addTexts: "Add text", collapseLibrary: "Collapse library", libraryDropHint: "Drop .txt files or a folder here", actions: "Actions",
    settings: "Settings", uiLanguage: "Interface language", theme: "Theme", themeAuto: "Auto", themeLight: "Light", themeDark: "Dark", textSize: "Text size",
    serifFont: "Serif font", showSavedWords: "Highlight saved words", zenMode: "Focus mode", swapTexts: "Swap columns",
    deleteText: "Delete", russian: "Russian", german: "German",
    newWords: "Learning now", studyCurrent: "Study this text", studyAll: "Study all “Learning now” words", studyDue: "Review", studyArchive: "Study every word",
    copyAnki: "Copy TSV for Anki", downloadAnki: "Download TSV for Anki", clearLearning: "Clear “Learning now”", clearLearningConfirm: "Remove every word from “Learning now”? They stay in “All words”.",
    archive: "All words", restoreArchive: "Move all words back to learning", searchWords: "Search words...",
    archiveHint: "Every word you have saved. Learned cards come back for review on their own when they are due.", noArchive: "Saved words will show up here.",
    dueNow: "due", learningNow: "learning now", nextReview: "review in {when}", moreContexts: "more sentences: {count}", removeFromLearning: "Remove from “Learning now”", restoreOne: "Learn again", deleteWord: "Delete word", deleteWordConfirm: "Delete “{word}” for good?",
    generator: "Add texts", saveToFolder: "Save to folder", folderAuto: "Automatic (by level)",
    importFilesTitle: "I already have a file", fileDropTitle: "Drop .txt files or a whole folder", fileDropHint: "A folder becomes a library folder. Several files at once work too. You can drop anywhere in the app.", chooseFiles: "Choose files", chooseFolder: "Choose folder",
    aiTitle: "Create a new text with AI", aiStep1: "Describe the text", aiStep2: "Copy the prompt into Claude, ChatGPT or Gemini", aiStep3: "Paste the whole AI reply and save",
    topic: "Topic or source text", level: "Level", textLength: "Text length", lengthShort: "Short (~150 words)", lengthMedium: "Medium (~300 words)", lengthLong: "Long (~500 words)", lengthXLong: "Very long (~800 words)",
    textStyle: "Genre", styleStory: "Story", styleNews: "News", styleDialogue: "Dialogue", styleArticle: "Article", moreOptions: "More options",
    focusWords: "Words to include (optional)", focusWordsHint: "For example: der Termin, verschieben, pünktlich", useMyWords: "Use my learning words",
    storyContext: "Story to continue (optional)", storyContextHint: "Paste a previous chapter, a summary, or the characters here.",
    extraInstructions: "Your own instructions for the AI (optional)", extraInstructionsHint: "For example: more colloquial phrases, set in Berlin.", grammarNotes: "Detailed grammar notes",
    showPrompt: "Show prompt", copyPrompt: "Copy prompt", importJson: "Save text", importFailed: "Text not recognized.", noSentencesFound: "No DE:/RU: sentences were found.",
    previewCounts: "{paragraphs} para. · {sentences} sentences · {words} words", previewNoWarnings: "Every word is linked, no warnings.", previewReplaces: "This text already exists and will be updated.",
    noTextFiles: "No .txt or .json files found.", fileUnreadable: "Could not read the file.", filesImported: "Texts imported: {count}.", filesImportedSomeFailed: "Imported: {count}, failed: {failed}.",
    dropHere: "Drop to import texts",
    showAnswer: "Show answer", again: "Again", hard: "Hard", good: "Good", easy: "Easy",
    noWords: "Click a word or phrase in the text to save it with its sentence.", noStudy: "Nothing is due right now.", done: "Session finished.", leftInQueue: "left: {count}",
    unitMin: "min", unitHour: "h",
    hide: "Hide", show: "Show", copiedPrompt: "Prompt copied. Paste it into the AI chat.", imported: "Text saved to the library.",
    noTexts: "The library has no texts.", folder: "Folder", newFolder: "New folder", unfiled: "Unfiled", cancel: "Cancel", save: "Save", folderEmpty: "Empty: drag texts here",
    renameFolder: "Rename folder", deleteFolder: "Delete folder", addToFolder: "Add text to this folder", folderName: "Folder name", folderAdded: "Folder added.", folderRenamed: "Folder renamed.", folderDeleted: "Folder deleted. Texts were kept unfiled.",
    renameLibraryText: "Rename text", moveLibraryText: "Move to folder", exportText: "Download as .txt", textName: "Text name", textRenamed: "Text renamed.", textMoved: "Text moved.", deleteTextConfirm: "Delete this text from the local library?", deleteFolderConfirm: "Delete this folder? Its texts will stay in the library as unfiled.",
    aboutTitle: "About Sync Reader", aboutIdea: "Sync Reader was developed from my personal idea to read more. I liked the parallel translation format in books and decided to recreate it in a convenient application where I can add any text I want.",
    aboutContext: "The main idea is to see a word immediately in sentence context instead of having only a direct word translation. You can also read the text first in your native language and then in the language you are learning. That makes the text easier to understand.",
    aboutStudy: "You can click words and save them while reading, then review them in an Anki-style flow or download a ready-to-use TSV file for Anki import.",
    aboutPet: "This is my pet project. More notes about my work:",
    deleted: "Text deleted.", copiedAnki: "TSV copied.", downloaded: "TSV downloaded.", mappingWarnings: "Mapping warnings",
    statDue: "Due now", statActive: "Learning now", statArchive: "Words total", statStudied: "Practiced", statReads: "Reads in 7 days", statTexts: "Texts",
    readProgress: "Progress per text", readProgressHint: "After each read, press “Finish reading” at the end of the text. This shows how many words were unknown in each read.", noReads: "No finished reads yet.",
    colText: "Text", colReads: "Reads", colFirst: "First", colLast: "Latest", colTrend: "Trend", colDate: "Date",
    dataTitle: "Data", dataHint: "Everything lives only in this browser. Make a backup so you don't lose your library and words.", exportBackup: "Download backup", importBackup: "Restore from backup",
    backupSaved: "Backup downloaded.", backupInvalid: "This is not a Sync Reader backup.", backupConfirm: "Replace all current data with the backup?", dangerZone: "Danger zone",
    studyCurrentShort: "Study", resetLocalData: "Reset all local data", resetConfirm: "Delete all local Sync Reader texts, words, stats, and settings?", resetDone: "Local data deleted.",
    popSaved: "Saved in your cards", popClickToSave: "Click to mark as unknown", popTapToSave: "Tap to mark as unknown",
    unknownThisRead: "unknown", sessionChipTitle: "Unknown words in this read",
    toastSaved: "Saved: {word} — {translation}", toastUnmarked: "Unmarked: {word}", toastMarkedAgain: "Unknown again: {word}. The card goes back to review.", toastBackToLearning: "{word} is back in learning",
    toastReadSaved: "Read saved: {count} unknown words.", toastReadSavedCompare: "Read saved: {count} unknown words (last time {previous}).",
    finishTitle: "End of text", finishSummary: "Marked as unknown in this read: {count} of {total} words ({percent}%).", finishReading: "Finish reading and save result", discardMarks: "Clear marks",
    finishHint: "Click the words you don't know. After saving, the next read starts clean and the result shows up in Stats.", thisRead: "Now", previousReads: "Previous reads", deleteRead: "Delete this read", readDeleted: "Read deleted.", deleteTextReads: "Delete this text's reading history", deleteTextReadsConfirm: "Delete every saved read of this text? Your cards stay.",
    lastUnknown: "last: {count} unknown", inProgress: "reading: {count} unknown",
    sections: "Sections", search: "Search", noResults: "Nothing found", zenExit: "Exit focus mode", hiddenSuffix: "hidden", emptyReader: "Choose a text in the library",
    statusParagraph: "paragraph {n} of {m}", statusMarked: "marked {count}", finishReadingShort: "Finish reading", openText: "Open", rename: "Rename", moveTo: "Move to", deleteTextMenu: "Delete…", deleteFolderMenu: "Delete folder…",
    showLibrary: "Show library", hideLibrary: "Hide library", resizeLibrary: "Resize library",
    textsUnit: { one: "text", other: "texts" },
    cardsUnit: { one: "card", other: "cards" },
    wordsUnit: { one: "word", other: "words" },
    daysUnit: { one: "day", other: "days" },
    readsUnit: { one: "read", other: "reads" }
  }
};

const seedTexts = window.createSeedTexts(normalizeDocument);
const TEXT_FOLDER = "texts";
const TEXT_FILE_LIMIT = 50;
const STORAGE = {
  library: "sync-reader-pairs-v2-library",
  folders: "sync-reader-pairs-v2-folders",
  bundledAdditions: "sync-reader-pairs-v2-bundled-additions",
  currentId: "sync-reader-pairs-v2-current-id",
  flashcards: "sync-reader-pairs-v2-flashcards",
  history: "sync-reader-pairs-v2-word-history",
  activeReads: "sync-reader-pairs-v2-active-reads",
  readLog: "sync-reader-pairs-v2-read-log",
  promptSettings: "sync-reader-prompt-settings"
};
const PREFS = {
  theme: "sync-reader-theme",
  fontScale: "sync-reader-font-scale",
  serif: "sync-reader-serif",
  showSaved: "sync-reader-show-saved"
};
const FONT_SCALES = [0.85, 0.92, 1, 1.08, 1.16, 1.25, 1.35, 1.5];
const DEFAULT_LIBRARY_FOLDERS = [
  { id: "wicos-neg", name: "Wicos Neg A2" },
  { id: "level-a2", name: "A2" },
  { id: "level-b1", name: "B1" },
  { id: "level-c1", name: "C1" }
];
const LEVEL_FOLDER_IDS = { A2: "level-a2", B1: "level-b1", C1: "level-c1" };
const BUNDLED_LIBRARY_ADDITION_IDS = new Set([
  "a2-wicos-neg-kapitel1-bank-v4",
  "a2-wicos-neg-kapitel2-family-v2",
  "a2-wicos-neg-kapitel3-wg-v2",
  "a2-wicos-neg-kapitel4-transport-v2",
  "a2-wicos-neg-kapitel5-termine-v2",
  "seed-a2-library-v2",
  "seed-c1-science-news-v2",
  "kleidung-a2-v2",
  "vergleichen-a2-v2",
  "life-nachbarin-paket-a2-v1",
  "life-pelmeni-einkaufen-a2-v1",
  "life-kaffeemaschine-reklamation-b1-v1",
  "life-wohnungssuche-b1-v1",
  "tech-a2-kaffee-laptop-v1",
  "tech-a2-oma-smartphone-v1",
  "tech-b1-freitag-bug-v1",
  "tech-b1-paket-sms-v1",
  "work-job-interview-a2-v1",
  "work-sick-day-a2-v1",
  "work-first-day-b1-v1",
  "work-train-strike-b1-v1",
  "work-lost-luggage-b1-v1",
  "money-first-salary-a2-v1",
  "money-saving-experiment-a2-v1",
  "money-utility-bill-b1-v1",
  "money-tax-return-b1-v1"
]);
const REMOVED_BUNDLED_TEXT_IDS = new Set([
  "seed-c1-energy-news",
  "a2-geld-bank-kapitel1-v3",
  "a2-wicos-neg-kapitel2-family",
  "a2-wicos-neg-kapitel3-wg",
  "a2-wicos-neg-kapitel4-transport",
  "a2-wicos-neg-kapitel5-termine",
  "seed-a2-library",
  "seed-c1-science-news",
  "kleidung-a2",
  "vergleichen-a2"
]);
const TEXT_DRAG_TYPE = "application/x-sync-reader-text";
const DAY = 24 * 60 * 60 * 1000;
const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const inlineFormatExample = [
  "title: Анна читает / Anna liest",
  "level: A2",
  "topic: пример",
  "hintLanguage: ru",
  "",
  "== p1",
  "DE: [Anna]1 [liest]2 [einen]3 [langen]4 [Satz]3.",
  "RU: [Анна]1 [читает]2 [длинное]4 [предложение]3.",
  "2 form: Инфинитив lesen: ich lese, er liest, wir lesen; Präteritum: las; Perfekt: hat gelesen.",
  "3 note: Der Satz: предложение.",
  "3 form: Akkusativ мужского рода: einen.",
  "4 form: Окончание -en после einen.",
  "",
  "DE: [Heute]1 [regnet]2 [es]0, [deshalb]3 [bleibt]4 [sie]5 [zu Hause]6.",
  "RU: [Сегодня]1 [идёт дождь]2, [поэтому]3 [она]5 [остаётся]4 [дома]6.",
  "2 form: Безличный глагол: es regnet; Präteritum: es regnete; Perfekt: es hat geregnet.",
  "4 form: Инфинитив bleiben: ich bleibe, er bleibt, wir bleiben; Präteritum: blieb; Perfekt: ist geblieben.",
  "4 sent: После deshalb личная форма глагола стоит на позиции 2, подлежащее идёт после неё.",
  "6 note: zu Hause = дома (где?), nach Hause = домой (куда?).",
  "",
  "== p2",
  "DE: [Am Abend]1 [ruft]2 [sie]3 [ihre Freundin]4 [an]2.",
  "RU: [Вечером]1 [она]3 [звонит]2 [своей подруге]4.",
  "1 note: am = an dem.",
  "2 form: Отделяемая приставка an стоит в конце. Инфинитив anrufen: ich rufe an, er ruft an, wir rufen an; Präteritum: rief an; Perfekt: hat angerufen.",
  "2 sent: Личная форма ruft стоит на позиции 2, приставка an закрывает предложение.",
  "4 form: Die Freundin: женский род, винительный падеж после anrufen."
].join("\n");

let uiLang = localStorage.getItem("sync-reader-ui-lang") || "ru";
let activeView = localStorage.getItem("sync-reader-view") || "reading";
let library = loadLibrary();
let libraryFolders = loadLibraryFolders(library);
let currentDocument = loadCurrentDocument();
let flashcards = loadJson(STORAGE.flashcards, []);
let wordHistory = loadJson(STORAGE.history, []);
let activeReads = loadJson(STORAGE.activeReads, {});
let readLog = loadJson(STORAGE.readLog, []);
let study = null;
let libraryDialogState = null;
let pendingImport = null;
let longPressTimer = 0;
let suppressNextClick = false;
let toastTimer = 0;
let previewTimer = 0;
let draggedTextId = "";
let statusScrollFrame = 0;
let treeFocusKey = "";
let treeLongPressTimer = 0;
const narrowLayout = window.matchMedia("(max-width: 1000px)");
const SIDEBAR_WIDTH = { key: "sync-reader-sidebar-width", min: 220, max: 360, fallback: 260 };
const els = {};

document.addEventListener("DOMContentLoaded", () => {
  [
    "appRoot", "openGenerator", "closeGenerator", "generatorDrawer", "topicInput", "levelInput", "lengthInput", "styleInput", "storyInput",
    "focusWordsInput", "extraInput", "grammarNotesInput", "useDueWords", "importFolder", "fileDrop", "pickFiles", "pickFolder", "fileInput", "folderInput", "fileResults", "importPreview",
    "promptOutput", "copyPrompt", "jsonInput", "importJson", "status", "libraryList", "librarySearch", "newFolder", "libraryPanel", "libraryBackdrop", "libraryTotal", "libraryResize", "contextMenu", "exitZen",
    "libraryDialog", "libraryDialogForm", "libraryDialogTitle", "libraryDialogNameField", "libraryDialogLabel", "libraryDialogName", "libraryDialogFolderField", "libraryDialogFolder", "libraryDialogSubmit", "closeLibraryDialog", "cancelLibraryDialog",
    "docMeta", "currentTitle", "reader", "readerRows", "readFinish", "ruHeadLabel", "deHeadLabel", "toggleRussian", "toggleGerman", "statusBar", "statusInfo", "statusWord", "studyCurrentLabel",
    "swapTexts", "toggleZen", "toggleLibrary", "wordsView", "rulesView", "statsView", "aboutView", "overviewStudyCurrent", "resetLocalData", "statActive", "statArchive", "statStudied", "statTexts", "statDue", "statReads", "readProgress",
    "exportBackup", "importBackup", "backupFile", "settingsMenu", "fontSizeValue", "prefSerif", "prefShowSaved", "dueBadge", "startStudyDue", "studyDueLabel", "wordSearch",
    "flashCount", "historyCount", "flashList", "historyList", "startStudyCurrent", "startStudyAll", "startStudyArchive", "restoreArchive", "copyAnki", "downloadAnki",
    "clearFlashcards", "studyModal", "closeStudy", "studyTitle", "studyProgressText", "studyQueueText", "dropOverlay", "wordPop", "toast",
    "studyProgress", "studyCard", "studyFront", "studyFrontSentence", "studyBack", "showAnswer", "studyActions"
  ].forEach((id) => els[id] = document.getElementById(id));

  els.closeStudy.innerHTML = iconSvg("sr-close");
  applyPrefs();
  loadPromptSettings();
  updateLanguageButtons();
  bindEvents();
  applyI18n();
  loadExternalTexts().then(() => {
    renderTextOptions();
    render();
    renderWords();
    renderStats();
  });
  renderTextOptions();
  render();
  renderWords();
  renderStats();
  updatePrompt();
});

function bindEvents() {
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewTarget));
  });
  setView(activeView);
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      uiLang = button.dataset.lang;
      localStorage.setItem("sync-reader-ui-lang", uiLang);
      updateLanguageButtons();
      applyI18n();
      renderTextOptions();
      render();
      renderWords();
      renderStats();
      updateStudyUi();
    });
  });
  document.querySelectorAll("[data-theme-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem(PREFS.theme, button.dataset.themeChoice);
      applyPrefs();
    });
  });
  document.querySelectorAll("[data-font-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = FONT_SCALES.indexOf(currentFontScale());
      const next = FONT_SCALES[Math.min(FONT_SCALES.length - 1, Math.max(0, (index < 0 ? 2 : index) + Number(button.dataset.fontStep)))];
      localStorage.setItem(PREFS.fontScale, String(next));
      applyPrefs();
    });
  });
  els.prefSerif.addEventListener("change", () => { localStorage.setItem(PREFS.serif, els.prefSerif.checked ? "1" : "0"); applyPrefs(); });
  els.prefShowSaved.addEventListener("change", () => { localStorage.setItem(PREFS.showSaved, els.prefShowSaved.checked ? "1" : "0"); applyPrefs(); });
  document.addEventListener("click", (event) => {
    if (els.settingsMenu.open && !els.settingsMenu.contains(event.target)) els.settingsMenu.open = false;
    document.querySelectorAll("details.library-menu[open]").forEach((menu) => {
      if (!menu.contains(event.target)) menu.open = false;
    });
    if (!els.contextMenu.hidden && !els.contextMenu.contains(event.target)) closeContextMenu();
  });
  window.addEventListener("resize", () => { closeContextMenu(); updateLibraryToggle(); });
  window.addEventListener("blur", closeContextMenu);

  els.swapTexts.addEventListener("click", () => {
    els.reader.classList.toggle("swapped");
    localStorage.setItem("sync-reader-swapped", els.reader.classList.contains("swapped") ? "1" : "0");
    updatePaneVisibility();
  });
  els.toggleZen.addEventListener("click", () => setZen(!els.appRoot.classList.contains("zen")));
  els.exitZen.addEventListener("click", () => setZen(false));
  els.toggleLibrary.addEventListener("click", () => {
    if (narrowLayout.matches) return setLibrarySheet(!els.appRoot.classList.contains("library-sheet-open"));
    els.appRoot.classList.toggle("library-collapsed");
    localStorage.setItem("sync-reader-library-collapsed", els.appRoot.classList.contains("library-collapsed") ? "1" : "0");
    updateLibraryToggle();
  });
  els.libraryBackdrop.addEventListener("click", () => setLibrarySheet(false));
  if (localStorage.getItem("sync-reader-library-collapsed") === "1") els.appRoot.classList.add("library-collapsed");
  const savedSwap = localStorage.getItem("sync-reader-swapped");
  if (savedSwap === null || savedSwap === "1") els.reader.classList.add("swapped");
  els.librarySearch.addEventListener("input", renderTextOptions);
  bindLibraryTree();
  bindContextMenuKeys();
  bindLibraryResize();
  updateLibraryToggle();

  els.openGenerator.addEventListener("click", () => openDrawer(true));
  els.newFolder.addEventListener("click", () => openLibraryDialog("new-folder"));
  els.closeGenerator.addEventListener("click", () => openDrawer(false));
  els.generatorDrawer.addEventListener("click", (event) => { if (event.target === els.generatorDrawer) openDrawer(false); });
  [els.topicInput, els.storyInput, els.focusWordsInput, els.extraInput].forEach((input) => input.addEventListener("input", onPromptSettingsChange));
  [els.levelInput, els.lengthInput, els.styleInput, els.grammarNotesInput].forEach((input) => input.addEventListener("change", onPromptSettingsChange));
  els.useDueWords.addEventListener("click", fillFocusWordsFromCards);
  els.copyPrompt.addEventListener("click", copyPrompt);
  els.jsonInput.addEventListener("input", () => {
    window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(updateImportPreview, 250);
  });
  els.importJson.addEventListener("click", importPasted);
  els.pickFiles.addEventListener("click", () => els.fileInput.click());
  els.pickFolder.addEventListener("click", () => els.folderInput.click());
  els.fileInput.addEventListener("change", async () => {
    await importFileList([...els.fileInput.files], false);
    els.fileInput.value = "";
  });
  els.folderInput.addEventListener("change", async () => {
    await importFileList([...els.folderInput.files], true);
    els.folderInput.value = "";
  });
  els.fileDrop.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); els.fileInput.click(); } });
  bindFileDrop();

  els.libraryDialogForm.addEventListener("submit", submitLibraryDialog);
  els.closeLibraryDialog.addEventListener("click", closeLibraryDialog);
  els.cancelLibraryDialog.addEventListener("click", closeLibraryDialog);
  els.libraryDialog.addEventListener("click", (event) => { if (event.target === els.libraryDialog) closeLibraryDialog(); });
  els.toggleRussian.addEventListener("click", () => togglePane("ru"));
  els.toggleGerman.addEventListener("click", () => togglePane("de"));
  els.startStudyCurrent.addEventListener("click", () => startStudy("current"));
  els.startStudyDue.addEventListener("click", () => startStudy("due"));
  els.startStudyAll.addEventListener("click", () => startStudy("all"));
  els.overviewStudyCurrent.addEventListener("click", () => startStudy("current"));
  els.startStudyArchive.addEventListener("click", () => startStudy("archive"));
  els.restoreArchive.addEventListener("click", restoreArchiveToFlashcards);
  els.wordSearch.addEventListener("input", renderWords);
  els.closeStudy.addEventListener("click", closeStudy);
  els.studyModal.addEventListener("click", (event) => { if (event.target === els.studyModal) closeStudy(); });
  els.showAnswer.addEventListener("click", revealAnswer);
  document.querySelectorAll("[data-grade]").forEach((button) => {
    button.addEventListener("click", () => gradeCurrent(button.dataset.grade));
  });
  document.addEventListener("keydown", handleKeys);
  els.copyAnki.addEventListener("click", copyAnki);
  els.downloadAnki.addEventListener("click", downloadAnki);
  els.resetLocalData.addEventListener("click", resetLocalData);
  els.exportBackup.addEventListener("click", exportBackup);
  els.importBackup.addEventListener("click", () => els.backupFile.click());
  els.backupFile.addEventListener("change", importBackupFile);
  els.clearFlashcards.addEventListener("click", () => {
    if (!flashcards.length || !confirm(t("clearLearningConfirm"))) return;
    flashcards = [];
    saveJson(STORAGE.flashcards, flashcards);
    renderWords();
    updateTokenMarks();
  });

  els.readerRows.addEventListener("mouseover", (event) => {
    const token = event.target.closest(".token");
    if (!token) return;
    setActiveToken(token.dataset.tokenIds || token.dataset.tokenId);
    showStatusWord(token);
  });
  els.readerRows.addEventListener("mouseout", (event) => {
    if (!event.target.closest(".token")) return;
    clearActiveTokens();
    showStatusWord(null);
    hidePopup();
  });
  els.readerRows.addEventListener("click", (event) => {
    const token = event.target.closest(".token");
    if (token) {
      if (suppressNextClick) {
        suppressNextClick = false;
        return;
      }
      hidePopup();
      handleTokenClick(token.dataset.tokenId, token.dataset.lang);
      return;
    }
    const hiddenCell = event.target.closest(".cell");
    if (hiddenCell && isHidden(hiddenCell.dataset.lang)) hiddenCell.classList.toggle("peek");
  });
  els.readerRows.addEventListener("touchstart", (event) => {
    hidePopup();
    const token = event.target.closest(".token");
    if (!token) return;
    window.clearTimeout(longPressTimer);
    longPressTimer = window.setTimeout(() => {
      suppressNextClick = true;
      setActiveToken(token.dataset.tokenIds || token.dataset.tokenId);
      showPopup(token);
    }, 450);
  }, { passive: true });
  ["touchend", "touchmove", "touchcancel"].forEach((type) => {
    els.readerRows.addEventListener(type, () => window.clearTimeout(longPressTimer), { passive: true });
  });
  els.readerRows.addEventListener("contextmenu", (event) => { if (event.target.closest(".token") && !hoverCapable) event.preventDefault(); });
  els.reader.addEventListener("scroll", () => {
    hidePopup();
    if (!statusScrollFrame) statusScrollFrame = window.requestAnimationFrame(() => { statusScrollFrame = 0; updateStatusInfo(); });
  }, { passive: true });
}

function applyI18n() {
  document.documentElement.lang = uiLang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = t(node.dataset.i18nTitle);
    node.setAttribute("aria-label", t(node.dataset.i18nTitle));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  els.libraryPanel.setAttribute("aria-label", t("library"));
  els.libraryResize.title = t("resizeLibrary");
  updateStudyButtonLabels();
  updateLanguageButtons();
  updatePaneVisibility();
  updateLibraryToggle();
}

function updateStudyButtonLabels() {
  setShortcutLabel(els.showAnswer, t("showAnswer"), "Space");
  const card = study?.current;
  document.querySelectorAll("[data-grade]").forEach((button) => {
    const shortcuts = { again: "1", hard: "2", good: "3", easy: "4" };
    const grade = button.dataset.grade;
    const hint = card ? formatInterval(previewInterval(card, grade)) : "";
    button.innerHTML = `<span>${escapeHtml(t(grade))} <span class="shortcut">${shortcuts[grade]}</span></span>${hint ? `<span class="grade-hint">${escapeHtml(hint)}</span>` : ""}`;
    button.title = `${t(grade)} (${shortcuts[grade]})`;
  });
}

function setShortcutLabel(button, label, shortcut) {
  if (!button) return;
  button.innerHTML = `${escapeHtml(label)} <span class="shortcut">${escapeHtml(shortcut)}</span>`;
  button.title = `${label} (${shortcut})`;
}

function updateLanguageButtons() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === uiLang);
  });
}

function t(key, vars) {
  let value = i18n[uiLang][key] ?? i18n.ru[key] ?? key;
  if (vars) value = value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "");
  return value;
}

// "5 карточек", "1 Karte": picks the plural form from the i18n entry.
function plural(count, key) {
  const forms = i18n[uiLang][key] || i18n.ru[key];
  const rule = new Intl.PluralRules(uiLang).select(count);
  return `${count} ${forms[rule] || forms.other || forms.many}`;
}

/* ---------- Preferences ---------- */

function currentFontScale() {
  const value = Number(localStorage.getItem(PREFS.fontScale));
  return FONT_SCALES.includes(value) ? value : 1;
}

function prefOn(key, fallback = true) {
  const value = localStorage.getItem(key);
  return value === null ? fallback : value === "1";
}

function applyPrefs() {
  const theme = localStorage.getItem(PREFS.theme) || "auto";
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll("[data-theme-choice]").forEach((button) => button.classList.toggle("active", button.dataset.themeChoice === theme));
  const scale = currentFontScale();
  document.documentElement.style.setProperty("--reader-size", `${(17 * scale).toFixed(2)}px`);
  els.fontSizeValue.textContent = `${Math.round(scale * 100)}%`;
  els.prefSerif.checked = prefOn(PREFS.serif, true);
  els.appRoot.classList.toggle("serif", els.prefSerif.checked);
  els.prefShowSaved.checked = prefOn(PREFS.showSaved);
  els.reader.classList.toggle("show-saved", els.prefShowSaved.checked);
}

function setZen(on) {
  els.appRoot.classList.toggle("zen", on);
  els.toggleZen.setAttribute("aria-pressed", String(on));
  if (on) setLibrarySheet(false);
}

function setLibrarySheet(open) {
  els.appRoot.classList.toggle("library-sheet-open", open);
  updateLibraryToggle();
}

// The toolbar's sidebar button collapses the library on wide windows and opens it as a sheet below 1000px.
function updateLibraryToggle() {
  if (!els.toggleLibrary) return;
  const shown = narrowLayout.matches ? els.appRoot.classList.contains("library-sheet-open") : !els.appRoot.classList.contains("library-collapsed");
  const label = t(shown ? "hideLibrary" : "showLibrary");
  els.toggleLibrary.setAttribute("aria-pressed", String(shown));
  els.toggleLibrary.setAttribute("aria-expanded", String(shown));
  els.toggleLibrary.title = label;
  els.toggleLibrary.setAttribute("aria-label", label);
}

function setView(view) {
  activeView = ["reading", "words", "rules", "stats", "about"].includes(view) ? view : "reading";
  localStorage.setItem("sync-reader-view", activeView);
  els.appRoot.dataset.view = activeView;
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    const current = button.dataset.viewTarget === activeView;
    button.classList.toggle("active", current);
    if (current) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (els.settingsMenu) els.settingsMenu.open = false;
  hidePopup();
  if (activeView === "words") renderWords();
  if (activeView === "stats") renderStats();
}

function openDrawer(open, folderId) {
  els.generatorDrawer.classList.toggle("open", open);
  els.generatorDrawer.setAttribute("aria-hidden", String(!open));
  if (!open) return;
  populateImportFolderSelect(folderId || "");
  setLibrarySheet(false);
  els.fileDrop.focus();
}

function handleKeys(event) {
  if (event.key === "Escape") {
    if (!els.contextMenu.hidden) return closeContextMenu(true);
    if (study && els.studyModal.classList.contains("open")) return closeStudy();
    if (els.generatorDrawer.classList.contains("open")) return openDrawer(false);
    if (els.settingsMenu.open) { els.settingsMenu.open = false; return; }
    if (els.appRoot.classList.contains("library-sheet-open")) return setLibrarySheet(false);
    if (!els.wordPop.hidden) return hidePopup();
    if (els.appRoot.classList.contains("zen")) return setZen(false);
    return;
  }
  handleStudyKeys(event);
}

/* ---------- Reader ---------- */

function render() {
  els.appRoot.classList.toggle("no-document", !currentDocument);
  if (!currentDocument) {
    els.currentTitle.textContent = "";
    els.docMeta.textContent = "";
    els.readerRows.innerHTML = `<div class="reader-empty">${iconSvg("sr-book-open")}<span>${escapeHtml(t("emptyReader"))}</span></div>`;
    els.readFinish.innerHTML = "";
    showStatusWord(null);
    updatePaneVisibility();
    updateReadingActions();
    return;
  }
  normalizeDocument(currentDocument);
  persistCurrentDocument();
  const titles = splitTitle(displayTitle(currentDocument));
  els.currentTitle.textContent = titles.de || titles.ru;
  els.currentTitle.lang = titles.de ? "de" : "ru";
  els.currentTitle.title = [currentDocument.title, currentDocument.level, currentDocument.topic].filter(Boolean).join(" · ");
  els.docMeta.textContent = titles.de ? titles.ru : "";
  renderReaderRows();
  showStatusWord(null);
  updatePaneVisibility();
  renderReadFinish();
  updateReadingActions();
}

function renderReaderRows() {
  const savedKeys = new Set(flashcards.map((card) => card.key));
  const markedSpots = currentMarkedSpots();
  const fragment = document.createDocumentFragment();
  currentDocument.paragraphs.forEach((paragraph) => {
    const row = document.createElement("section");
    row.className = "para-row";
    [["ru", "left"], ["de", "right"]].forEach(([lang, side]) => {
      const cell = document.createElement("div");
      cell.className = `cell cell-${lang}`;
      cell.dataset.lang = lang;
      cell.lang = lang;
      const body = document.createElement("p");
      body.className = "text-body";
      buildParagraphPieces(paragraph, side).forEach((piece) => {
        if (piece.type === "text") {
          body.appendChild(document.createTextNode(piece.value));
          return;
        }
        const token = piece.token;
        const key = `${lang}:${normalKey(token[side])}`;
        const span = document.createElement("span");
        span.className = "token";
        if (savedKeys.has(key)) span.classList.add("saved");
        if (markedSpots.has(`${key}|${token.id}`)) span.classList.add("marked");
        span.dataset.tokenId = token.id;
        span.dataset.tokenIds = piece.tokenIds.join(" ");
        span.dataset.lang = lang;
        span.dataset.key = key;
        span.textContent = piece.value;
        body.appendChild(span);
      });
      cell.appendChild(body);
      row.appendChild(cell);
    });
    fragment.appendChild(row);
  });
  els.readerRows.replaceChildren(fragment);
}

// Cheap refresh after a click: only token classes change, the text stays.
function updateTokenMarks() {
  const savedKeys = new Set(flashcards.map((card) => card.key));
  const markedSpots = currentMarkedSpots();
  els.readerRows.querySelectorAll(".token").forEach((span) => {
    span.classList.toggle("saved", savedKeys.has(span.dataset.key));
    span.classList.toggle("marked", markedSpots.has(`${span.dataset.key}|${span.dataset.tokenId}`));
  });
  renderReadFinish();
  updateReadingActions();
}

// Status bar: "Учить · N" for the current text's cards, plus level / words / position / marked count.
function updateReadingActions() {
  const currentCards = currentDocument ? flashcards.filter((card) => card.textId === currentDocument.id).length : 0;
  els.startStudyCurrent.hidden = !currentCards;
  els.studyCurrentLabel.textContent = `${t("studyCurrentShort")} · ${currentCards}`;
  els.startStudyCurrent.title = t("studyCurrent");
  updateStatusInfo();
}

function updateStatusInfo() {
  if (!els.statusInfo) return;
  if (!currentDocument) {
    els.statusInfo.textContent = "";
    return;
  }
  const rows = [...els.readerRows.querySelectorAll(".para-row")];
  const parts = [currentDocument.level, plural(countTokens("right"), "wordsUnit")].filter(Boolean);
  if (rows.length) parts.push(t("statusParagraph", { n: currentParagraphIndex(rows) + 1, m: rows.length }));
  const marked = currentSession()?.marked.length || 0;
  if (marked) parts.push(t("statusMarked", { count: marked }));
  els.statusInfo.textContent = parts.join(" · ");
  els.statusInfo.title = marked ? t("sessionChipTitle") : "";
}

// The paragraph nearest the top of the reader viewport (below the sticky column header).
function currentParagraphIndex(rows) {
  const head = els.reader.querySelector(".reader-head");
  const top = els.reader.getBoundingClientRect().top + (head?.offsetHeight || 0) + 4;
  const index = rows.findIndex((row) => row.getBoundingClientRect().bottom > top);
  return index < 0 ? rows.length - 1 : index;
}

function showStatusWord(span) {
  if (!els.statusWord) return;
  const token = span ? findToken(span.dataset.tokenId) : null;
  if (!token) {
    els.statusWord.textContent = "";
    return;
  }
  const word = document.createElement("b");
  word.lang = "de";
  word.textContent = token.right || "";
  const translation = document.createElement("span");
  translation.lang = "ru";
  translation.textContent = token.left || "";
  els.statusWord.replaceChildren(word, document.createTextNode(" — "), translation);
}

// "Pelmeni für den ganzen Kurs / Пельмени для всего курса" in either order -> { de, ru }.
function splitTitle(title) {
  const value = String(title || "").trim();
  const parts = value.split(" / ").map((part) => part.trim()).filter(Boolean);
  const cyrillic = (text) => /\p{Script=Cyrillic}/u.test(text);
  if (parts.length < 2) return cyrillic(value) ? { de: "", ru: value } : { de: value, ru: "" };
  const ru = parts.filter(cyrillic);
  const de = parts.filter((part) => !cyrillic(part));
  if (!de.length || !ru.length) return { de: parts[0], ru: parts.slice(1).join(" / ") };
  return { de: de.join(" / "), ru: ru.join(" / ") };
}

function togglePane(lang) {
  localStorage.setItem(`sync-reader-hide-${lang}`, isHidden(lang) ? "0" : "1");
  els.readerRows.querySelectorAll(".cell.peek").forEach((cell) => cell.classList.remove("peek"));
  updatePaneVisibility();
  clearActiveTokens();
}

function isHidden(lang) {
  return localStorage.getItem(`sync-reader-hide-${lang}`) === "1";
}

function updatePaneVisibility() {
  els.reader.classList.toggle("hide-ru", isHidden("ru"));
  els.reader.classList.toggle("hide-de", isHidden("de"));
  els.toggleRussian.setAttribute("aria-pressed", String(isHidden("ru")));
  els.toggleGerman.setAttribute("aria-pressed", String(isHidden("de")));
  els.ruHeadLabel.textContent = isHidden("ru") ? `${t("russian")} · ${t("hiddenSuffix")}` : t("russian");
  els.deHeadLabel.textContent = isHidden("de") ? `${t("german")} · ${t("hiddenSuffix")}` : t("german");
  const ruLabel = `${isHidden("ru") ? t("show") : t("hide")}: ${t("russian")}`;
  const deLabel = `${isHidden("de") ? t("show") : t("hide")}: ${t("german")}`;
  els.toggleRussian.title = ruLabel;
  els.toggleRussian.setAttribute("aria-label", ruLabel);
  els.toggleGerman.title = deLabel;
  els.toggleGerman.setAttribute("aria-label", deLabel);
}

function setActiveToken(tokenIds) {
  clearActiveTokens();
  const selectors = String(tokenIds || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((tokenId) => `[data-token-ids~="${cssEscape(tokenId)}"]`);
  if (!selectors.length) return;
  els.readerRows.querySelectorAll(selectors.join(",")).forEach((node) => node.classList.add("active"));
}

function clearActiveTokens() {
  els.readerRows.querySelectorAll(".token.active").forEach((node) => node.classList.remove("active"));
}

/* ---------- Word popup (touch long-press only) ---------- */

function showPopup(span) {
  const token = findToken(span.dataset.tokenId);
  if (!token) return;
  const lang = span.dataset.lang;
  const side = lang === "ru" ? "left" : "right";
  const otherSide = lang === "ru" ? "right" : "left";
  const key = span.dataset.key;
  const notes = [uniqueExplanations(token.note, token.formTip), token.sentenceNote].filter(Boolean);
  const saved = flashcards.some((card) => card.key === key);
  els.wordPop.innerHTML = `
    <div class="pop-source">${escapeHtml(token[side])} · ${lang.toUpperCase()}</div>
    <div class="pop-translation">${escapeHtml(token[otherSide])}</div>
    ${notes.map((note) => `<div class="pop-note">${escapeHtml(note)}</div>`).join("")}
    <div class="pop-state">${escapeHtml(saved ? t("popSaved") : (hoverCapable ? t("popClickToSave") : t("popTapToSave")))}</div>
  `;
  els.wordPop.hidden = false;
  const rect = span.getBoundingClientRect();
  const pop = els.wordPop.getBoundingClientRect();
  const left = Math.min(window.innerWidth - pop.width - 12, Math.max(12, rect.left + rect.width / 2 - pop.width / 2));
  const above = rect.top - pop.height - 8;
  const top = above > 8 ? above : Math.min(window.innerHeight - pop.height - 8, rect.bottom + 8);
  els.wordPop.style.left = `${left}px`;
  els.wordPop.style.top = `${top}px`;
}

function hidePopup() {
  if (els.wordPop) els.wordPop.hidden = true;
}

/* ---------- Saving words + reading sessions ---------- */

function currentSession() {
  return currentDocument ? activeReads[currentDocument.id] || null : null;
}

function currentMarkedKeys() {
  return new Set((currentSession()?.marked || []).map((mark) => mark.key));
}

// Only the clicked occurrences get the strong mark; other occurrences of the word look "saved".
function currentMarkedSpots() {
  return new Set((currentSession()?.marked || []).flatMap((mark) => (mark.spots || []).map((spot) => `${mark.key}|${spot}`)));
}

function ensureSession() {
  if (!activeReads[currentDocument.id]) activeReads[currentDocument.id] = { startedAt: new Date().toISOString(), marked: [] };
  return activeReads[currentDocument.id];
}

function saveSessions() {
  saveJson(STORAGE.activeReads, activeReads);
}

// A click marks the word as unknown in this read. New words become cards (with
// their sentence in both languages); known cards are sent back for review.
// Clicking a word marked in this read undoes the mark.
function handleTokenClick(tokenId, lang) {
  if (!currentDocument) return;
  const token = findToken(tokenId);
  const paragraph = findParagraphForToken(tokenId);
  if (!token || !paragraph) return;
  const side = lang === "ru" ? "left" : "right";
  const key = `${lang}:${normalKey(token[side])}`;
  const session = ensureSession();
  const markIndex = session.marked.findIndex((mark) => mark.key === key);
  let message;
  const existingMark = session.marked[markIndex];
  if (existingMark && !(existingMark.spots || []).includes(tokenId)) {
    // Same word, another place in the text: just mark this spot too.
    existingMark.spots = [...(existingMark.spots || []), tokenId];
    message = t("toastMarkedAgain", { word: existingMark.source });
  } else if (markIndex >= 0) {
    const [mark] = session.marked.splice(markIndex, 1);
    if (mark.created) {
      flashcards = flashcards.filter((card) => card.key !== key);
      wordHistory = wordHistory.filter((card) => card.key !== key || (card.reps || 0) > 0);
    } else if (mark.restored) {
      flashcards = flashcards.filter((card) => card.key !== key);
    }
    message = t("toastUnmarked", { word: token[side] });
  } else {
    const context = buildContext(paragraph, token, lang);
    let card = flashcards.find((item) => item.key === key);
    const mark = { key, source: token[side], translation: token[lang === "ru" ? "right" : "left"], created: false, restored: false, spots: [tokenId] };
    if (card) {
      card.due = Date.now();
      message = t("toastMarkedAgain", { word: card.source });
    } else {
      const archived = wordHistory.find((item) => item.key === key);
      if (archived) {
        card = { ...archived, due: Date.now(), interval: 0 };
        flashcards.unshift(card);
        mark.restored = true;
        message = t("toastBackToLearning", { word: card.source });
      } else {
        card = {
          key, tokenId, textId: currentDocument.id, textTitle: currentDocument.title, lang,
          source: token[side], translation: token[lang === "ru" ? "right" : "left"],
          formTip: token.formTip || "", sentenceNote: token.sentenceNote || "", note: token.note || "",
          sentence: context.sentence, sentenceTranslation: context.sentenceTranslation, contexts: [],
          addedAt: new Date().toISOString(), interval: 0, ease: 2.5, reps: 0, due: Date.now()
        };
        flashcards.unshift(card);
        mark.created = true;
        message = t("toastSaved", { word: card.source, translation: card.translation });
      }
    }
    addContext(card, context);
    upsertHistory(card);
    session.marked.push(mark);
  }
  saveJson(STORAGE.flashcards, flashcards);
  saveJson(STORAGE.history, wordHistory);
  saveSessions();
  updateTokenMarks();
  renderWords();
  renderTextOptions();
  showToast(message);
}

function buildContext(paragraph, token, lang) {
  const side = lang === "ru" ? "left" : "right";
  const otherSide = lang === "ru" ? "right" : "left";
  return {
    textId: currentDocument.id,
    tokenId: token.id,
    sentence: findSentenceForToken(paragraph, token, side) || paragraph[side] || "",
    sentenceTranslation: findSentenceForToken(paragraph, token, otherSide) || "",
    translation: token[otherSide]
  };
}

function addContext(card, context) {
  card.contexts = Array.isArray(card.contexts) ? card.contexts : [];
  if (!card.sentence) {
    card.sentence = context.sentence;
    card.sentenceTranslation = context.sentenceTranslation;
  }
  const all = [{ textId: card.textId, tokenId: card.tokenId, sentence: card.sentence, sentenceTranslation: card.sentenceTranslation }, ...card.contexts];
  if (all.some((item) => item.sentence === context.sentence)) return;
  card.contexts.unshift({ textId: context.textId, tokenId: context.tokenId, sentence: context.sentence, sentenceTranslation: context.sentenceTranslation });
  card.contexts = card.contexts.slice(0, 6);
}

// Sentence pair for a card: saved on the card, or looked up for older cards.
function cardContexts(card) {
  const primary = { textId: card.textId, tokenId: card.tokenId, sentence: card.sentence || "", sentenceTranslation: card.sentenceTranslation || "" };
  if (!primary.sentence || !primary.sentenceTranslation) {
    const found = findSentencePairForCard(card);
    primary.sentence = primary.sentence || found.sentence;
    primary.sentenceTranslation = primary.sentenceTranslation || found.sentenceTranslation;
  }
  return [primary, ...(Array.isArray(card.contexts) ? card.contexts : [])].filter((item) => item.sentence);
}

function findSentencePairForCard(card) {
  const doc = library.find((item) => item.id === card.textId);
  const paragraph = doc?.paragraphs.find((item) => item.tokens.some((token) => token.id === card.tokenId));
  const token = paragraph?.tokens.find((item) => item.id === card.tokenId);
  if (!token) return { sentence: "", sentenceTranslation: "" };
  const side = card.lang === "ru" ? "left" : "right";
  const otherSide = card.lang === "ru" ? "right" : "left";
  return { sentence: findSentenceForToken(paragraph, token, side), sentenceTranslation: findSentenceForToken(paragraph, token, otherSide) };
}

function finishReading() {
  if (!currentDocument) return;
  const session = currentSession() || { startedAt: new Date().toISOString(), marked: [] };
  const total = countTokens("right");
  const previous = readLog.filter((entry) => entry.textId === currentDocument.id).at(-1);
  readLog.push({
    textId: currentDocument.id,
    title: currentDocument.title,
    startedAt: session.startedAt,
    finishedAt: new Date().toISOString(),
    unknown: session.marked.length,
    total,
    words: session.marked.map((mark) => mark.source)
  });
  delete activeReads[currentDocument.id];
  saveJson(STORAGE.readLog, readLog);
  saveSessions();
  updateTokenMarks();
  renderTextOptions();
  renderStats();
  const count = session.marked.length;
  showToast(previous
    ? t("toastReadSavedCompare", { count, previous: previous.unknown })
    : t("toastReadSaved", { count }));
}

function discardSessionMarks() {
  if (!currentDocument || !currentSession()) return;
  delete activeReads[currentDocument.id];
  saveSessions();
  updateTokenMarks();
}

function textReads(textId) {
  return readLog.filter((entry) => entry.textId === textId);
}

function renderReadFinish() {
  if (!currentDocument) {
    els.readFinish.innerHTML = "";
    return;
  }
  const session = currentSession();
  const marked = session?.marked.length || 0;
  const total = countTokens("right") || 1;
  const reads = textReads(currentDocument.id).slice(-8);
  const maxValue = Math.max(marked, ...reads.map((entry) => entry.unknown), 1);
  const rows = reads.map((entry, index) => readHistoryRow(formatDateTime(entry.finishedAt), entry.unknown, entry.total || total, maxValue, false, entry.finishedAt));
  if (marked || !reads.length) rows.push(readHistoryRow(t("thisRead"), marked, total, maxValue, true));
  els.readFinish.setAttribute("aria-label", t("finishTitle"));
  els.readFinish.innerHTML = `
    <div class="read-finish-row">
      <span class="read-finish-summary">${escapeHtml(t("finishSummary", { count: marked, total, percent: percent(marked, total) }))}</span>
      <button class="button" type="button" data-finish-read title="${escapeHtml(t("finishReading"))}">${escapeHtml(t("finishReadingShort"))}</button>
      ${marked ? `<button class="button subtle" type="button" data-discard-read>${escapeHtml(t("discardMarks"))}</button>` : ""}
    </div>
    ${reads.length ? `<div class="read-history" aria-label="${escapeHtml(t("previousReads"))}">${rows.join("")}</div>` : ""}
    <p class="hint">${escapeHtml(t("finishHint"))}</p>
  `;
  els.readFinish.querySelector("[data-finish-read]").addEventListener("click", finishReading);
  els.readFinish.querySelector("[data-discard-read]")?.addEventListener("click", discardSessionMarks);
  els.readFinish.querySelectorAll("[data-delete-read]").forEach((button) => {
    button.addEventListener("click", () => deleteRead(currentDocument.id, button.dataset.deleteRead));
  });
}

function readHistoryRow(label, count, total, maxValue, current, finishedAt) {
  const remove = finishedAt
    ? `<button class="remove" type="button" data-delete-read="${escapeHtml(finishedAt)}" title="${escapeHtml(t("deleteRead"))}" aria-label="${escapeHtml(t("deleteRead"))}">${buttonIcon("sr-trash")}</button>`
    : "<span></span>";
  return `<div class="read-history-row ${current ? "current" : ""}">
    <span>${escapeHtml(label)}</span>
    <div class="read-bar"><span style="width:${Math.round((count / maxValue) * 100)}%"></span></div>
    <b>${count} · ${percent(count, total)}%</b>
    ${remove}
  </div>`;
}

function deleteRead(textId, finishedAt) {
  readLog = readLog.filter((entry) => !(entry.textId === textId && entry.finishedAt === finishedAt));
  saveJson(STORAGE.readLog, readLog);
  renderReadFinish();
  renderTextOptions();
  renderStats();
  showToast(t("readDeleted"));
}

function deleteTextReads(textId) {
  if (!confirm(t("deleteTextReadsConfirm"))) return;
  readLog = readLog.filter((entry) => entry.textId !== textId);
  saveJson(STORAGE.readLog, readLog);
  renderReadFinish();
  renderTextOptions();
  renderStats();
}

function formatDateTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString(uiLang, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function percent(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(uiLang, { day: "numeric", month: "short" });
}

function showToast(message) {
  if (!els.toast || !message) return;
  els.toast.textContent = message;
  els.toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { els.toast.hidden = true; }, 2600);
}

function setStatus(message) {
  if (els.generatorDrawer?.classList.contains("open")) els.status.textContent = message;
  showToast(message);
}

/* ---------- Words page ---------- */

function isDue(card, now = Date.now()) {
  return (card.due || 0) <= now;
}

function dueCards() {
  const now = Date.now();
  const learningKeys = new Set(flashcards.map((card) => card.key));
  return [
    ...flashcards.filter((card) => isDue(card, now)),
    ...wordHistory.filter((card) => !learningKeys.has(card.key) && (card.reps || 0) > 0 && isDue(card, now))
  ];
}

function renderWords() {
  const due = dueCards();
  els.dueBadge.hidden = !due.length;
  els.dueBadge.textContent = String(due.length);
  els.studyDueLabel.textContent = `${t("studyDue")} · ${due.length}`;
  els.startStudyDue.disabled = !due.length;
  els.flashCount.textContent = plural(flashcards.length, "cardsUnit");
  els.historyCount.textContent = plural(wordHistory.length, "wordsUnit");
  const query = (els.wordSearch?.value || "").trim().toLocaleLowerCase();
  const matches = (card) => !query || [card.source, card.translation, card.sentence, card.textTitle].join(" ").toLocaleLowerCase().includes(query);
  fillWordList(els.flashList, flashcards.filter(matches), "learning", t("noWords"));
  const learningKeys = new Set(flashcards.map((card) => card.key));
  fillWordList(els.historyList, wordHistory.filter(matches).slice(0, 300), "all", t("noArchive"), learningKeys);
  updateReadingActions();
  renderStats();
}

function fillWordList(container, cards, mode, emptyText, learningKeys) {
  container.innerHTML = "";
  if (!cards.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }
  const fragment = document.createDocumentFragment();
  cards.forEach((card) => fragment.appendChild(createWordNode(card, mode, learningKeys)));
  container.appendChild(fragment);
}

function createWordNode(card, mode, learningKeys) {
  const node = document.createElement("article");
  node.className = "flash-card";
  const context = cardContexts(card)[0];
  const due = mode === "learning" ? isDue(card) : (card.reps || 0) > 0 && isDue(card) && !learningKeys?.has(card.key);
  const extra = (card.contexts?.length || 0);
  const nextReview = !due && (card.reps || 0) > 0 && card.due > Date.now() ? t("nextReview", { when: formatDue(card.due) }) : "";
  node.innerHTML = `
    <div class="term">${escapeHtml(card.source)} <span class="pill">${escapeHtml(card.lang.toUpperCase())}</span>${due ? `<span class="pill due">${escapeHtml(t("dueNow"))}</span>` : ""}${mode === "all" && learningKeys?.has(card.key) ? `<span class="pill">${escapeHtml(t("learningNow"))}</span>` : ""}</div>
    <div class="translation">${escapeHtml(card.translation)}</div>
    ${context ? `<div class="flash-sentence">${highlightPhrase(context.sentence, card.source)}</div>` : ""}
    <div class="flash-meta">${escapeHtml([card.textTitle ? shortTitle(card.textTitle) : "", extra ? t("moreContexts", { count: extra }) : "", nextReview].filter(Boolean).join(" · "))}</div>
  `;
  const actions = document.createElement("div");
  actions.className = "flash-card-actions";
  if (mode === "learning") {
    actions.appendChild(wordAction("sr-trash", t("removeFromLearning"), () => {
      flashcards = flashcards.filter((item) => item.key !== card.key);
      saveJson(STORAGE.flashcards, flashcards);
      renderWords();
      updateTokenMarks();
    }));
  } else {
    if (!learningKeys?.has(card.key)) actions.appendChild(wordAction("sr-graduation", t("restoreOne"), () => restoreArchivedCard(card), true));
    actions.appendChild(wordAction("sr-trash", t("deleteWord"), () => {
      if (!confirm(t("deleteWordConfirm", { word: card.source }))) return;
      flashcards = flashcards.filter((item) => item.key !== card.key);
      wordHistory = wordHistory.filter((item) => item.key !== card.key);
      saveJson(STORAGE.flashcards, flashcards);
      saveJson(STORAGE.history, wordHistory);
      renderWords();
      updateTokenMarks();
    }));
  }
  node.appendChild(actions);
  return node;
}

function wordAction(icon, label, action, neutral = false) {
  const button = document.createElement("button");
  button.className = `remove ${neutral ? "neutral" : ""}`;
  button.type = "button";
  button.title = label;
  button.setAttribute("aria-label", label);
  button.innerHTML = buttonIcon(icon);
  button.addEventListener("click", action);
  return button;
}

function shortTitle(title) {
  return String(title || "").split(" / ")[0];
}

function highlightPhrase(sentence, phrase) {
  const text = String(sentence || "");
  const parts = [String(phrase || "").trim(), ...String(phrase || "").split(/\s+/)].filter((part) => part.length > 1 || /\p{L}/u.test(part));
  const lower = text.toLocaleLowerCase();
  const ranges = [];
  for (const part of parts) {
    const needle = part.toLocaleLowerCase();
    let from = 0;
    while (needle && from < lower.length) {
      const index = lower.indexOf(needle, from);
      if (index < 0) break;
      const end = index + needle.length;
      const bounded = !isWordChar(text[index - 1]) && !isWordChar(text[end]);
      if (bounded && !ranges.some((range) => index < range.end && end > range.start)) {
        ranges.push({ start: index, end });
        break;
      }
      from = index + 1;
    }
    if (part === parts[0] && ranges.length) break;
  }
  ranges.sort((a, b) => a.start - b.start);
  let html = "";
  let cursor = 0;
  ranges.forEach((range) => {
    html += escapeHtml(text.slice(cursor, range.start)) + `<mark>${escapeHtml(text.slice(range.start, range.end))}</mark>`;
    cursor = range.end;
  });
  return html + escapeHtml(text.slice(cursor));
}

function renderStats() {
  if (!els.statActive) return;
  const weekAgo = Date.now() - 7 * DAY;
  els.statDue.textContent = String(dueCards().length);
  els.statActive.textContent = String(flashcards.length);
  els.statArchive.textContent = String(wordHistory.length);
  els.statStudied.textContent = String(wordHistory.filter((card) => (card.reps || 0) > 0).length);
  els.statReads.textContent = String(readLog.filter((entry) => new Date(entry.finishedAt).getTime() >= weekAgo).length);
  els.statTexts.textContent = String(library.length);
  renderReadProgress();
}

function renderReadProgress() {
  const byText = new Map();
  readLog.forEach((entry) => {
    if (!byText.has(entry.textId)) byText.set(entry.textId, []);
    byText.get(entry.textId).push(entry);
  });
  if (!byText.size) {
    els.readProgress.innerHTML = `<div class="empty">${escapeHtml(t("noReads"))}</div>`;
    return;
  }
  const rows = [...byText.entries()]
    .map(([textId, entries]) => ({ textId, entries, last: entries.at(-1) }))
    .sort((a, b) => new Date(b.last.finishedAt) - new Date(a.last.finishedAt));
  els.readProgress.innerHTML = `
    <table class="read-table">
      <thead><tr><th>${escapeHtml(t("colText"))}</th><th class="num">${escapeHtml(t("colReads"))}</th><th class="num">${escapeHtml(t("colFirst"))}</th><th class="num">${escapeHtml(t("colLast"))}</th><th>${escapeHtml(t("colTrend"))}</th><th class="num">${escapeHtml(t("colDate"))}</th><th></th></tr></thead>
      <tbody>${rows.map(({ textId, entries, last }) => {
        const first = entries[0];
        const doc = library.find((item) => item.id === textId);
        const maxValue = Math.max(...entries.map((entry) => entry.unknown), 1);
        const delta = last.unknown - first.unknown;
        const deltaHtml = entries.length > 1 && delta ? ` <span class="${delta < 0 ? "delta-good" : "delta-bad"}">${delta > 0 ? "+" : ""}${delta}</span>` : "";
        return `<tr>
          <td>${doc ? `<button class="link" type="button" data-open-text="${escapeHtml(textId)}">${escapeHtml(displayTitle(doc))}</button>` : escapeHtml(last.title || textId)}</td>
          <td class="num">${entries.length}</td>
          <td class="num">${first.unknown}</td>
          <td class="num">${last.unknown}${deltaHtml}</td>
          <td><div class="trend" title="${escapeHtml(entries.map((entry) => entry.unknown).join(" → "))}">${entries.slice(-12).map((entry) => `<span style="height:${Math.max(8, Math.round((entry.unknown / maxValue) * 100))}%"></span>`).join("")}</div></td>
          <td class="num">${escapeHtml(formatDate(last.finishedAt))}</td>
          <td><button class="remove" type="button" data-delete-text-reads="${escapeHtml(textId)}" title="${escapeHtml(t("deleteTextReads"))}" aria-label="${escapeHtml(t("deleteTextReads"))}">${buttonIcon("sr-trash")}</button></td>
        </tr>`;
      }).join("")}</tbody>
    </table>`;
  els.readProgress.querySelectorAll("[data-delete-text-reads]").forEach((button) => {
    button.addEventListener("click", () => deleteTextReads(button.dataset.deleteTextReads));
  });
  els.readProgress.querySelectorAll("[data-open-text]").forEach((button) => {
    button.addEventListener("click", () => {
      const doc = library.find((item) => item.id === button.dataset.openText);
      if (doc) selectLibraryText(doc);
    });
  });
}

function buttonIcon(id) {
  return `<svg class="icon" aria-hidden="true"><use href="${iconHref(id)}"></use></svg>`;
}

function restoreArchivedCard(card) {
  if (!flashcards.some((item) => item.key === card.key)) {
    flashcards.unshift({ ...card, due: Date.now() });
    saveJson(STORAGE.flashcards, flashcards);
  }
  renderWords();
  updateTokenMarks();
}

function restoreArchiveToFlashcards() {
  wordHistory.forEach((card) => {
    if (!flashcards.some((item) => item.key === card.key)) {
      flashcards.unshift({ ...card, due: Date.now() });
    }
  });
  saveJson(STORAGE.flashcards, flashcards);
  renderWords();
  updateTokenMarks();
}

/* ---------- Study ---------- */

function startStudy(scope) {
  const cards = scope === "archive"
    ? [...wordHistory]
    : scope === "all"
      ? [...flashcards]
      : scope === "due"
        ? dueCards()
        : currentDocument
          ? flashcards.filter((card) => card.textId === currentDocument.id)
          : [];
  if (!cards.length) {
    setStatus(t("noStudy"));
    return;
  }
  hidePopup();
  study = {
    scope,
    queue: cards.sort((a, b) => (a.due || 0) - (b.due || 0)),
    done: 0,
    total: cards.length,
    current: null,
    revealed: false
  };
  els.studyModal.classList.add("open");
  els.studyModal.setAttribute("aria-hidden", "false");
  nextStudyCard();
}

function nextStudyCard() {
  if (!study || !study.queue.length) {
    finishStudy();
    return;
  }
  study.current = study.queue.shift();
  study.revealed = false;
  els.studyActions.hidden = false;
  els.showAnswer.hidden = false;
  els.studyCard.classList.remove("revealed");
  els.studyActions.classList.remove("revealed");
  const card = study.current;
  const contexts = cardContexts(card);
  study.context = contexts.length ? contexts[(card.reps || 0) % contexts.length] : null;
  els.studyFront.textContent = card.source;
  els.studyFrontSentence.innerHTML = study.context ? highlightPhrase(study.context.sentence, card.source) : "";
  renderStudyBack(card, study.context);
  updateStudyUi();
}

function renderStudyBack(card, context) {
  const parts = [`<div class="study-answer">${escapeHtml(card.translation)}</div>`];
  if (context?.sentenceTranslation) {
    parts.push(`<div class="study-sentence">${highlightPhrase(context.sentenceTranslation, card.translation)}</div>`);
  }
  [uniqueExplanations(card.note, card.formTip), card.sentenceNote].filter(Boolean).forEach((text) => {
    parts.push(`<div class="study-note">${escapeHtml(text)}</div>`);
  });
  els.studyBack.innerHTML = parts.join("");
}

function revealAnswer() {
  if (!study?.current) return;
  study.revealed = true;
  els.studyCard.classList.add("revealed");
  els.studyActions.classList.add("revealed");
}

function handleStudyKeys(event) {
  if (!study || !els.studyModal.classList.contains("open")) return;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    if (!study.revealed) revealAnswer();
    return;
  }
  const grades = { Digit1: "again", Numpad1: "again", Digit2: "hard", Numpad2: "hard", Digit3: "good", Numpad3: "good", Digit4: "easy", Numpad4: "easy" };
  const grade = grades[event.code];
  if (grade && study.revealed) {
    event.preventDefault();
    gradeCurrent(grade);
  }
}

// Days until the next review (minutes for "again", hours for "hard").
function previewInterval(card, grade) {
  if (grade === "again") return { minutes: 1 };
  if (grade === "hard") return { hours: 6 };
  const multiplier = grade === "easy" ? 3.2 : 2.2;
  return { days: Math.max(1, Math.round((card.interval || 1) * multiplier)) };
}

function formatInterval(value) {
  if (value.minutes) return `${value.minutes} ${t("unitMin")}`;
  if (value.hours) return `${value.hours} ${t("unitHour")}`;
  return plural(value.days, "daysUnit");
}

function formatDue(due) {
  const diff = due - Date.now();
  if (diff < 60 * 60 * 1000) return `${Math.max(1, Math.round(diff / 60000))} ${t("unitMin")}`;
  if (diff < DAY) return `${Math.round(diff / 3600000)} ${t("unitHour")}`;
  return plural(Math.round(diff / DAY), "daysUnit");
}

function gradeCurrent(grade) {
  if (!study?.current) return;
  const card = study.current;
  if (!study.revealed) {
    revealAnswer();
    return;
  }
  const now = Date.now();
  card.reps = (card.reps || 0) + 1;
  if (grade === "again") {
    card.interval = 0;
    card.due = now + 60 * 1000;
    if (!flashcards.some((item) => item.key === card.key)) flashcards.unshift(card);
    study.queue.splice(Math.min(2, study.queue.length), 0, card);
  } else if (grade === "hard") {
    card.interval = Math.max(1, Math.round((card.interval || 1) * 1.2));
    card.due = now + 6 * 60 * 60 * 1000;
    study.queue.push(card);
  } else {
    card.interval = previewInterval(card, grade).days;
    card.due = now + card.interval * DAY;
    study.done += 1;
    if (grade === "easy" || card.reps >= 2) {
      removeActiveCard(card.key);
    } else {
      study.queue.push(card);
    }
  }
  upsertHistory(card);
  saveJson(STORAGE.flashcards, flashcards);
  saveJson(STORAGE.history, wordHistory);
  renderWords();
  updateTokenMarks();
  nextStudyCard();
}

function finishStudy() {
  if (!study) return;
  els.studyFront.textContent = t("done");
  els.studyFrontSentence.innerHTML = "";
  els.studyBack.innerHTML = "";
  els.studyCard.classList.remove("revealed");
  els.studyActions.classList.remove("revealed");
  els.studyActions.hidden = true;
  els.showAnswer.hidden = true;
  study.current = null;
  study.done = study.total;
  updateStudyUi();
  renderWords();
  updateTokenMarks();
}

function closeStudy() {
  els.studyModal.classList.remove("open");
  els.studyModal.setAttribute("aria-hidden", "true");
  study = null;
}

function updateStudyUi() {
  if (!els.studyModal || !study) return;
  const complete = Math.min(study.done, study.total);
  const titles = { due: "studyDue", current: "studyCurrent", all: "studyAll", archive: "studyArchive" };
  els.studyTitle.textContent = t(titles[study.scope] || "newWords");
  els.studyProgressText.textContent = `${complete} / ${study.total}`;
  els.studyQueueText.textContent = t("leftInQueue", { count: study.queue.length + (study.current ? 1 : 0) });
  els.studyProgress.style.width = `${study.total ? (complete / study.total) * 100 : 0}%`;
  updateStudyButtonLabels();
}

function removeActiveCard(key) {
  flashcards = flashcards.filter((card) => card.key !== key);
}

function upsertHistory(card) {
  const existing = wordHistory.findIndex((item) => item.key === card.key);
  const saved = { ...card, lastSeenAt: new Date().toISOString() };
  if (existing >= 0) wordHistory[existing] = { ...wordHistory[existing], ...saved };
  else wordHistory.unshift(saved);
}

function buildParagraphPieces(paragraph, side) {
  const text = paragraph[side] || "";
  const pieces = [];
  const placements = [];
  const alignedSentenceRanges = findAlignedSentenceRanges(paragraph, side);

  paragraph.tokens.forEach((token) => {
    const parts = side === "left" ? token.leftParts : token.rightParts;
    const sentenceRange = alignedSentenceRanges.get(token.id);
    const joinedPlacement = side === "right" ? findJoinedGermanTokenPlacement(text, parts, placements, sentenceRange) : null;
    if (joinedPlacement) {
      placements.push({ type: "token", token, tokenIds: [token.id], ...joinedPlacement });
      return;
    }
    parts.forEach((phrase) => {
      if (!phrase) return;
      const index = findFreeIndex(text, phrase, placements, sentenceRange);
      if (index < 0) {
        addSharedPlacementToken(text, phrase, placements, token, sentenceRange);
        return;
      }
      placements.push({
        type: "token",
        token,
        tokenIds: [token.id],
        value: phrase,
        index,
        end: index + phrase.length
      });
    });
  });

  placements.sort((a, b) => a.index - b.index);
  let cursor = 0;
  placements.forEach((placement) => {
    if (placement.index < cursor) return;
    if (placement.index > cursor) pieces.push({ type: "text", value: text.slice(cursor, placement.index) });
    pieces.push({ type: "token", token: placement.token, tokenIds: placement.tokenIds, value: placement.value });
    cursor = placement.end;
  });
  if (cursor < text.length) pieces.push({ type: "text", value: text.slice(cursor) });
  return pieces.length ? pieces : [{ type: "text", value: text }];
}

function findAlignedSentenceRanges(paragraph, side) {
  if (paragraph.sentences?.length) {
    const ranges = explicitSentenceRanges(paragraph, side);
    const alignedRanges = new Map();
    paragraph.tokens.forEach((token) => {
      const range = ranges[token.sentenceIndex];
      if (range) alignedRanges.set(token.id, range);
    });
    return alignedRanges;
  }
  if (side !== "left") return new Map();
  const textRanges = sentenceRanges(paragraph[side] || "");
  const pairedText = paragraph.right || "";
  const pairedRanges = sentenceRanges(pairedText);
  if (textRanges.length !== pairedRanges.length) return new Map();

  const pairedPlacements = [];
  const alignedRanges = new Map();
  paragraph.tokens.forEach((token) => {
    const placement = placeTokenPart(pairedText, "right", token.rightParts, pairedPlacements);
    if (!placement) return;
    pairedPlacements.push(placement);
    const sentenceIndex = findSentenceRangeIndex(pairedRanges, placement.index);
    if (sentenceIndex >= 0) alignedRanges.set(token.id, textRanges[sentenceIndex]);
  });
  return alignedRanges;
}

function explicitSentenceRanges(paragraph, side) {
  const key = side === "left" ? "left" : "right";
  let cursor = 0;
  return paragraph.sentences.map((sentence) => {
    const text = sentence[key] || "";
    const range = { start: cursor, end: cursor + text.length };
    cursor = range.end + 1;
    return range;
  });
}

function placeTokenPart(text, side, parts, placements) {
  const joinedPlacement = side === "right" ? findJoinedGermanTokenPlacement(text, parts, placements) : null;
  if (joinedPlacement) return joinedPlacement;
  for (const phrase of parts) {
    if (!phrase) continue;
    const index = findFreeIndex(text, phrase, placements);
    if (index >= 0) return { value: phrase, index, end: index + phrase.length };
  }
  return null;
}

function addSharedPlacementToken(text, phrase, placements, token, range) {
  const sharedPlacement = findSharedPlacement(text, phrase, placements, range);
  if (!sharedPlacement || sharedPlacement.tokenIds.includes(token.id)) return false;
  sharedPlacement.tokenIds.push(token.id);
  return true;
}

function findSharedPlacement(text, phrase, placements, range) {
  const start = range?.start || 0;
  const limit = range?.end || text.length;
  return placements.find((placement) => {
    if (placement.index < start || placement.end > limit) return false;
    if (placement.end - placement.index !== phrase.length) return false;
    return text.slice(placement.index, placement.end) === phrase;
  }) || null;
}

function sentenceRanges(text) {
  const ranges = [];
  let start = 0;
  for (const match of String(text || "").matchAll(/[.!?]+/gu)) {
    const end = match.index + match[0].length;
    if (text.slice(start, end).trim()) ranges.push({ start, end });
    start = end;
  }
  if (text.slice(start).trim()) ranges.push({ start, end: text.length });
  return ranges;
}

function findSentenceRangeIndex(ranges, index) {
  return ranges.findIndex((range) => index >= range.start && index < range.end);
}

function findJoinedGermanTokenPlacement(text, parts, placements, range) {
  if (parts.length !== 2 || !parts.every(isWordPart)) return null;
  // Generated pairs keep separable verbs split even when clauses join prefix and verb.
  const candidates = [`${parts[1]}${parts[0]}`, `${parts[0]}${parts[1]}`];
  for (const phrase of candidates) {
    const index = findFreeIndex(text, phrase, placements, range);
    if (index >= 0) return { value: text.slice(index, index + phrase.length), index, end: index + phrase.length };
  }
  return null;
}

function findFreeIndex(text, phrase, placements, range) {
  let start = range?.start || 0;
  const limit = range?.end || text.length;
  while (start < limit) {
    const index = text.indexOf(phrase, start);
    if (index < 0 || index + phrase.length > limit) return -1;
    const end = index + phrase.length;
    const overlaps = placements.some((item) => index < item.end && end > item.index);
    if (!overlaps && hasPhraseBoundary(text, index, end)) return index;
    start = index + 1;
  }
  return -1;
}

function hasPhraseBoundary(text, start, end) {
  return !isWordChar(text[start - 1]) && !isWordChar(text[end]);
}

function isWordChar(char) {
  return !!char && /[\p{L}\p{N}-]/u.test(char);
}

function isWordPart(value) {
  return /^[\p{L}\p{N}-]+$/u.test(String(value || ""));
}

function uniqueExplanations(...items) {
  const unique = [];
  items.filter(Boolean).forEach((item) => {
    const normalized = normalKey(item);
    if (!unique.some((saved) => normalKey(saved) === normalized)) unique.push(item);
  });
  return unique.join("\n\n");
}

/* ---------- Prompt for the AI ---------- */

const PROMPT_FIELDS = ["topicInput", "levelInput", "lengthInput", "styleInput", "storyInput", "focusWordsInput", "extraInput"];

function loadPromptSettings() {
  const saved = loadJson(STORAGE.promptSettings, null);
  if (!saved) return;
  PROMPT_FIELDS.forEach((id) => {
    if (typeof saved[id] === "string" && els[id]) els[id].value = saved[id];
  });
  if (typeof saved.grammarNotes === "boolean") els.grammarNotesInput.checked = saved.grammarNotes;
}

function onPromptSettingsChange() {
  const settings = { grammarNotes: els.grammarNotesInput.checked };
  PROMPT_FIELDS.forEach((id) => settings[id] = els[id].value);
  saveJson(STORAGE.promptSettings, settings);
  updatePrompt();
}

function fillFocusWordsFromCards() {
  const words = [...flashcards, ...dueCards()]
    .filter((card) => card.lang === "de")
    .map((card) => card.source)
    .filter((word, index, all) => word && all.indexOf(word) === index)
    .slice(0, 20);
  if (!words.length) return setStatus(t("noWords"));
  els.focusWordsInput.value = words.join(", ");
  onPromptSettingsChange();
}

async function copyPrompt() {
  updatePrompt();
  try {
    await navigator.clipboard.writeText(els.promptOutput.value);
    setStatus(t("copiedPrompt"));
  } catch {
    els.promptOutput.closest("details").open = true;
    els.promptOutput.select();
  }
}

function updatePrompt() {
  if (!els.promptOutput) return;
  els.promptOutput.value = buildPrompt();
}

function buildPrompt() {
  const level = els.levelInput?.value || "A2";
  const topic = els.topicInput?.value.trim() || "актуальная новость или короткая история";
  const wordTarget = Number(els.lengthInput?.value) || 300;
  const paragraphHint = wordTarget <= 200 ? "3-4" : wordTarget <= 350 ? "5-7" : wordTarget <= 550 ? "8-10" : "11-14";
  const story = els.storyInput?.value.trim() || "";
  const focusWords = els.focusWordsInput?.value.trim() || "";
  const extra = els.extraInput?.value.trim() || "";
  const grammarNotes = els.grammarNotesInput ? els.grammarNotesInput.checked : true;
  const styles = {
    story: "Жанр: история с героями и сюжетом.",
    news: "Жанр: новость или репортаж, нейтральный стиль, факты и цифры.",
    dialogue: "Жанр: в основном диалог между 2-3 героями (реплики в кавычках внутри предложений), с короткими связками автора.",
    article: "Жанр: научно-популярная или познавательная статья с объяснениями и примерами."
  };
  const style = els.styleInput?.value || "story";
  return [
    "Создай текст для приложения синхронного чтения RU/DE в строчном формате со связанными словами (описан ниже).",
    "",
    "Языки:",
    "- русский текст: строки RU:",
    "- немецкий текст: строки DE:",
    "- все подсказки и объяснения: только на русском языке",
    "- объясняй только немецкий язык: форму, артикль, падеж, порядок слов, времена, приставки, отделяемые приставки, управление и устойчивые выражения",
    "",
    `Уровень CEFR: ${level}`,
    `Тема/источник: ${topic}`,
    styles[style] || styles.story,
    "",
    ...(story ? [
      "Контекст истории (продолжи её):",
      "---",
      story,
      "---",
      "- Сохрани героев, их характеры, отношения и уже известные факты. Не пересказывай старые события, а развивай сюжет дальше: новая сцена, новая ситуация, новая лексика.",
      ""
    ] : []),
    ...(focusWords ? [
      `Обязательно естественно используй в немецком тексте эти слова (в любой нужной форме), каждое хотя бы один раз: ${focusWords}`,
      ""
    ] : []),
    ...(extra ? ["Дополнительные пожелания:", extra, ""] : []),
    "Сюжет и качество текста:",
    `- Объём: не меньше ${wordTarget} немецких слов. Это жёсткое требование: перед ответом посчитай слова в немецком тексте; если их меньше ${wordTarget}, расширь текст новыми сценами и деталями.`,
    `- Раздели текст на ${paragraphHint} абзацев по 4-7 предложений.`,
    style === "story" || style === "dialogue"
      ? "- Построй настоящую историю с логичной аркой: завязка, конкретная проблема или неожиданный поворот, попытка её решить, развязка. Не пиши плоское перечисление действий."
      : "- Построй текст логично: вступление, основная часть с конкретными фактами и примерами, вывод.",
    "- Дай героям имена, мотивацию и конкретные детали: места, дни, время, предметы, суммы, числа. Каждая сцена должна логично следовать из предыдущей.",
    "- Оживи текст: добавь 1-3 короткие реплики прямой речью, вопрос или лёгкую шутку.",
    "- Варьируй структуру предложений: не начинай подряд несколько предложений с подлежащего. Используй время, место и связки в начале: Am Morgen, Plötzlich, Deshalb, Danach, Zum Glück, Trotzdem, Zuerst, Später.",
    "- Используй широкую лексику: как можно больше тематических существительных, глаголов и прилагательных именно по этой теме. Не строй текст только на базовых глаголах (machen, gehen, sagen, sehen, kommen, haben) — где естественно, бери точный глагол: bestellen, vergleichen, reparieren, verschieben, empfehlen, sich beschweren и т.п.",
    "- Не повторяй одно содержательное слово много раз, если есть естественный синоним или местоимение.",
    `- Грамматика уровня ${level} должна встречаться разнообразно: модальные глаголы, Perfekt, отделяемые приставки, придаточные с weil/dass/wenn — но не сложнее уровня.`,
    "",
    "Формат ответа (это не JSON, а простой текст по строкам):",
    "- Верни только текст в этом формате: без markdown, без ``` и без пояснений до или после.",
    "- Сначала шапка из строк title:, level:, topic:, hintLanguage: ru. Заголовок пиши как «Русский / Deutsch».",
    "- Каждый абзац начинается строкой == p1, == p2 и т. д.",
    "- Каждое предложение — две строки подряд: DE: немецкое предложение, затем RU: его русский перевод. Между предложениями пустая строка.",
    "- Внутри обоих предложений отметь связанные слова квадратными скобками с номером сразу после скобки: [слово]N. Одинаковый номер в DE и RU означает, что это перевод друг друга. В каждом предложении нумеруй заново с 1.",
    "- Номер пишется сразу после ], без пробела. Каждую [ обязательно закрывай ]. Скобки только отмечают слова: текст внутри скобок — это ровно те слова, что стоят в предложении, в той же форме.",
    "- Главный принцип: одна связь = одно немецкое слово или одна немецкая грамматическая мини-группа.",
    "- Артикль, притяжательное или указательное слово отмечай вместе с существительным: [die Natur]3 и [природу]3. Если между ними стоит прилагательное, дай артиклю и существительному один номер, а прилагательному свой: [eine]4 [kleine]5 [Nachricht]4.",
    "- Отделяемый глагол, разорванный в предложении, отмечай обе части одним номером: [ruft]2 sie ... [an]2. Если глагол стоит слитно, отмечай одно слово: [abhebt]5. Никогда не отмечай буквы внутри слова: Jeans — одно слово, в нём нельзя выделять an.",
    "- Если русская фраза из нескольких слов переводит одно немецкое слово или мини-группу, отметь её целиком одной скобкой: [weil]5 и [потому что]5.",
    "- Если одно русское слово переводит две немецкие связи, перечисли номера через запятую: [холодно]7,8.",
    "- Если у слова нет пары в другом языке (например, немецкое es или zu), поставь номер 0: [es]0. Не выдумывай перевод, которого нет в русском предложении: для es не ставь «это», если отдельного «это» в русском нет.",
    "- Отметь скобками каждое слово в обоих предложениях; неотмеченные слова импорт покажет как предупреждение. Знаки препинания не отмечай.",
    "- Делай связи мелкими: глагол отдельно, отрицание отдельно, прилагательное отдельно, наречие отдельно. Не объединяй целое предложение или всю именную группу в одну связь. Группируй только мини-группы: артикль+существительное, отделяемый глагол, устойчивое выражение, предлог с артиклем вроде im/am/zum.",
    "",
    "Подсказки — отдельные строки сразу после RU-строки предложения: N вид: текст, где N — номер связи из этого предложения.",
    "- N note: контекстное значение или синонимы. Только если это полезно.",
    "- N form: грамматика немецкого слова.",
    "- N sent: конструкция немецкого предложения: позиция глагола, рамка, придаточное, инфинитивная группа, порядок слов.",
    "- Если полезной подсказки нет, строку не пиши.",
    ...(grammarNotes ? [
      "- Для КАЖДОГО глагола (личная форма, инфинитив, отделяемый или возвратный глагол) обязательно пиши строку form со спряжением по шаблону: «Инфинитив kaufen: ich kaufe, er kauft, wir kaufen; Präteritum: kaufte; Perfekt: hat gekauft.» Если у глагола есть и другая грамматическая подсказка, поставь спряжение после неё.",
      "- В спряжении отделяемых глаголов показывай приставку (ich rufe an, er ruft an; Perfekt: hat angerufen), у возвратных — местоимение (ich freue mich, er freut sich; Perfekt: hat sich gefreut), у безличных — форму с es (es klappt; Präteritum: klappte). Исключение: не добавляй спряжение sein/haben к связям типа «ist kostenlos», где карточка про прилагательное.",
      "- form для существительных и прилагательных добавляй только если есть конкретная грамматика немецкого: артикль, падеж, окончание прилагательного, множественное число, zu-инфинитив, управление предлога."
    ] : [
      "- Подсказки делай короткими и редкими: только для неочевидных форм, отделяемых глаголов и устойчивых выражений. Для глаголов достаточно инфинитива: «Инфинитив kaufen.»"
    ]),
    "- Все подсказки пиши в одну строку. Не пиши общие фразы вроде «важное слово», «смотрите на контекст», «это связывает идеи». Не объясняй русский язык.",
    "- Темы новостей только неполитические: наука, природа, технологии, культура, здоровье, путешествия, образование, городская жизнь, бытовая экономика.",
    "- Если это новость, перескажи своими учебными словами, не копируй источник.",
    "",
    "Пример формата:",
    inlineFormatExample
  ].join("\n");
}

/* ---------- Import: pasted reply ---------- */

function updateImportPreview() {
  const source = els.jsonInput.value.trim();
  pendingImport = null;
  els.importJson.disabled = true;
  els.status.textContent = "";
  if (!source) {
    els.importPreview.hidden = true;
    return;
  }
  const result = textFormat.parseTextSource(source);
  els.importPreview.hidden = false;
  if (result.errors.length || !result.doc) {
    els.importPreview.className = "import-preview bad";
    els.importPreview.innerHTML = `<strong>${escapeHtml(t("importFailed"))}</strong>${issueList(result.errors)}`;
    return;
  }
  let doc;
  try {
    doc = normalizeDocument(structuredClone(result.doc));
  } catch (error) {
    els.importPreview.className = "import-preview bad";
    els.importPreview.innerHTML = `<strong>${escapeHtml(t("importFailed"))}</strong><div>${escapeHtml(error.message)}</div>`;
    return;
  }
  if (!countDocTokens(doc)) {
    els.importPreview.className = "import-preview bad";
    els.importPreview.innerHTML = `<strong>${escapeHtml(t("importFailed"))}</strong><div>${escapeHtml(t("noSentencesFound"))}</div>${issueList(result.warnings)}`;
    return;
  }
  pendingImport = { result, source };
  els.importJson.disabled = false;
  const sentences = doc.paragraphs.reduce((sum, paragraph) => sum + (paragraph.sentences?.length || 0), 0);
  const first = doc.paragraphs.find((paragraph) => paragraph.right)?.sentences?.[0]?.right || doc.paragraphs[0]?.right || "";
  const exists = library.some((item) => item.id === importIdFor(doc, source));
  els.importPreview.className = `import-preview ${result.warnings.length ? "" : "ok"}`;
  els.importPreview.innerHTML = `
    <strong>${escapeHtml(doc.title)}</strong>
    <div>${escapeHtml([doc.level, t("previewCounts", { paragraphs: doc.paragraphs.length, sentences, words: countDocTokens(doc) })].filter(Boolean).join(" · "))}</div>
    ${first ? `<div class="sample">${escapeHtml(first)}</div>` : ""}
    ${exists ? `<div>${escapeHtml(t("previewReplaces"))}</div>` : ""}
    ${result.warnings.length ? `<details><summary>${escapeHtml(t("mappingWarnings"))}: ${result.warnings.length}</summary>${issueList(result.warnings)}</details>` : `<div>${escapeHtml(t("previewNoWarnings"))}</div>`}
  `;
}

function issueList(issues) {
  const shown = issues.slice(0, 40).map((entry) => `<li>${escapeHtml(`${entry.path}: ${entry.message}`)}</li>`);
  if (issues.length > shown.length) shown.push(`<li>… +${issues.length - shown.length}</li>`);
  return `<ul class="import-issues">${shown.join("")}</ul>`;
}

function importPasted() {
  if (!pendingImport) updateImportPreview();
  if (!pendingImport) return;
  const doc = addImportedDocument(pendingImport.result.doc, pendingImport.source, els.importFolder.value);
  if (!doc) return;
  els.jsonInput.value = "";
  updateImportPreview();
  openDrawer(false);
  selectLibraryText(doc);
  setStatus(t("imported"));
}

function countDocTokens(doc) {
  return doc.paragraphs.reduce((sum, paragraph) => sum + paragraph.tokens.filter((token) => token.right).length, 0);
}

// Same file imported twice gets the same id, so it updates instead of duplicating.
function importIdFor(doc, source) {
  if (doc.id && !/^doc-\d+$/.test(doc.id)) return doc.id;
  const slug = String(doc.title || "text").toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "text";
  return `user-${slug}-${hashString(String(source).trim())}`;
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function addImportedDocument(rawDoc, source, folderId, fallbackTitle) {
  let doc;
  try {
    doc = normalizeDocument(structuredClone(rawDoc));
  } catch (error) {
    setStatus(error.message);
    return null;
  }
  if (!countDocTokens(doc)) {
    setStatus(t("noSentencesFound"));
    return null;
  }
  if ((!rawDoc.title || doc.title === "Untitled") && fallbackTitle) doc.title = fallbackTitle;
  doc.id = importIdFor(rawDoc, source);
  doc.source = doc.source && doc.source !== "local" ? doc.source : "user import";
  doc.folderId = findUsableFolderId(folderId) || doc.folderId;
  upsertDocument(doc);
  return library.find((item) => item.id === doc.id) || doc;
}

function populateImportFolderSelect(selectedId) {
  els.importFolder.innerHTML = "";
  const auto = document.createElement("option");
  auto.value = "";
  auto.textContent = t("folderAuto");
  els.importFolder.appendChild(auto);
  libraryFolders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name;
    if (folder.id === selectedId) option.selected = true;
    els.importFolder.appendChild(option);
  });
}

/* ---------- Import: files, folders, drag and drop ---------- */

function isTextFileName(name) {
  return /\.(txt|json)$/i.test(name) && !/^index\.json$/i.test(name) && !name.startsWith(".");
}

async function importFileList(files, fromFolderPicker) {
  const entries = files
    .filter((file) => isTextFileName(file.name))
    .map((file) => {
      const parts = String(file.webkitRelativePath || "").split("/").filter(Boolean);
      return { file, dirName: fromFolderPicker && parts.length > 1 ? parts[parts.length - 2] : "" };
    });
  await importEntries(entries, "");
}

async function importEntries(entries, targetFolderId) {
  if (!entries.length) {
    setStatus(t("noTextFiles"));
    return;
  }
  const results = [];
  let firstDoc = null;
  for (const { file, dirName } of entries) {
    let source;
    try {
      source = await file.text();
    } catch {
      results.push({ name: file.name, state: "error", detail: t("fileUnreadable") });
      continue;
    }
    const parsed = textFormat.parseTextSource(source);
    const rawDocs = parsed.doc ? [parsed.doc] : [];
    if (!parsed.doc && textFormat.looksLikeJson(source)) {
      try {
        const data = JSON.parse(source);
        if (Array.isArray(data)) rawDocs.push(...data);
      } catch {
        // Reported below with the parser errors.
      }
    }
    if (!rawDocs.length || parsed.errors.length && !rawDocs.length) {
      results.push({ name: file.name, state: "error", detail: parsed.errors.slice(0, 2).map((entry) => `${entry.path}: ${entry.message}`).join("; ") || t("importFailed") });
      continue;
    }
    const folderId = targetFolderId || (dirName ? ensureFolderByName(dirName) : els.importFolder?.value || "");
    rawDocs.forEach((rawDoc, index) => {
      const doc = addImportedDocument(rawDoc, rawDocs.length > 1 ? `${source}#${index}` : source, folderId, file.name.replace(/\.(txt|json)$/i, ""));
      if (!doc) {
        results.push({ name: file.name, state: "error", detail: `${t("importFailed")} ${t("noSentencesFound")}` });
        return;
      }
      firstDoc = firstDoc || doc;
      results.push({
        name: file.name,
        state: parsed.warnings.length ? "warn" : "ok",
        detail: `${doc.title}${parsed.warnings.length ? ` · ${t("mappingWarnings")}: ${parsed.warnings.length}` : ""}`
      });
    });
  }
  renderFileResults(results);
  renderTextOptions();
  const okCount = results.filter((entry) => entry.state !== "error").length;
  const failed = results.length - okCount;
  setStatus(failed ? t("filesImportedSomeFailed", { count: okCount, failed }) : t("filesImported", { count: okCount }));
  if (failed && !els.generatorDrawer.classList.contains("open")) openDrawer(true);
  if (firstDoc && !failed && okCount === 1) selectLibraryText(firstDoc);
}

function renderFileResults(results) {
  els.fileResults.innerHTML = results.map((entry) => `
    <div class="file-result ${entry.state}"><span class="dot"></span><div>${escapeHtml(entry.name)}<small>${escapeHtml(entry.detail)}</small></div></div>
  `).join("");
}

function ensureFolderByName(name) {
  const clean = String(name || "").trim();
  if (!clean) return "";
  const existing = libraryFolders.find((folder) => folder.name.toLocaleLowerCase() === clean.toLocaleLowerCase());
  if (existing) return existing.id;
  const folder = { id: createFolderId(), name: clean };
  libraryFolders.push(folder);
  saveLibraryState();
  return folder.id;
}

function hasFiles(event) {
  return [...(event.dataTransfer?.types || [])].includes("Files");
}

function bindFileDrop() {
  let depth = 0;
  window.addEventListener("dragenter", (event) => {
    if (!hasFiles(event)) return;
    depth += 1;
    els.dropOverlay.hidden = false;
    els.appRoot.classList.add("is-dragging");
  });
  window.addEventListener("dragleave", (event) => {
    if (!hasFiles(event)) return;
    depth = Math.max(0, depth - 1);
    if (!depth) {
      els.dropOverlay.hidden = true;
      els.appRoot.classList.remove("is-dragging");
      document.querySelectorAll(".library-folder.drop-target").forEach((node) => node.classList.remove("drop-target"));
    }
  });
  window.addEventListener("dragover", (event) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    document.querySelectorAll(".library-folder.drop-target").forEach((node) => node.classList.remove("drop-target"));
    event.target.closest?.(".library-folder")?.classList.add("drop-target");
  });
  window.addEventListener("drop", async (event) => {
    if (!hasFiles(event)) return;
    event.preventDefault();
    depth = 0;
    els.dropOverlay.hidden = true;
    els.appRoot.classList.remove("is-dragging");
    const folderNode = event.target.closest?.(".library-folder");
    document.querySelectorAll(".library-folder.drop-target").forEach((node) => node.classList.remove("drop-target"));
    const entries = await collectDroppedEntries(event.dataTransfer);
    await importEntries(entries, folderNode?.dataset.folderId || "");
  });
}

async function collectDroppedEntries(dataTransfer) {
  const items = [...(dataTransfer.items || [])];
  const fsEntries = items.map((item) => item.webkitGetAsEntry?.()).filter(Boolean);
  if (!fsEntries.length) {
    return [...(dataTransfer.files || [])].filter((file) => isTextFileName(file.name)).map((file) => ({ file, dirName: "" }));
  }
  const collected = [];
  for (const entry of fsEntries) await walkEntry(entry, "", collected);
  return collected;
}

async function walkEntry(entry, dirName, collected) {
  if (entry.isFile) {
    if (!isTextFileName(entry.name)) return;
    const file = await new Promise((resolve) => entry.file(resolve, () => resolve(null)));
    if (file) collected.push({ file, dirName });
    return;
  }
  if (!entry.isDirectory) return;
  const reader = entry.createReader();
  let batch;
  do {
    batch = await new Promise((resolve) => reader.readEntries(resolve, () => resolve([])));
    for (const child of batch) await walkEntry(child, entry.name, collected);
  } while (batch.length);
}

/* ---------- Library ---------- */

function renderTextOptions() {
  const query = (els.librarySearch?.value || "").trim().toLocaleLowerCase();
  const filtered = library.filter((doc) => !query || `${doc.title} ${doc.level} ${doc.topic}`.toLocaleLowerCase().includes(query));
  const hadFocus = els.libraryList.contains(document.activeElement);
  els.libraryList.innerHTML = "";
  els.libraryTotal.textContent = plural(library.length, "textsUnit");
  els.appRoot.classList.toggle("library-is-empty", !library.length);
  renderLibraryGroups(filtered, query, currentDocument?.id);
  updateTreeTabStop(hadFocus);
}

function renderLibraryGroups(filtered, query, currentId) {
  if (!library.length) {
    const empty = document.createElement("div");
    empty.className = "library-empty";
    empty.innerHTML = `${iconSvg("sr-doc")}<p>${escapeHtml(t("libraryDropHint"))}</p><button class="text-button" type="button">${escapeHtml(t("addTexts"))}</button>`;
    empty.querySelector("button").addEventListener("click", () => openDrawer(true));
    els.libraryList.appendChild(empty);
    return;
  }
  if (!filtered.length && query) {
    const empty = document.createElement("div");
    empty.className = "library-no-results";
    empty.textContent = t("noResults");
    els.libraryList.appendChild(empty);
    return;
  }
  libraryFolders.forEach((folder) => {
    const docs = filtered.filter((doc) => doc.folderId === folder.id);
    if (!docs.length && query) return;
    els.libraryList.appendChild(createLibraryFolderNode(folder, docs, currentId, query));
  });
  const folderIds = new Set(libraryFolders.map((folder) => folder.id));
  const unfiled = filtered.filter((doc) => !doc.folderId || !folderIds.has(doc.folderId));
  if (unfiled.length || !query) els.libraryList.appendChild(createLibraryFolderNode(null, unfiled, currentId, query));
}

function createLibraryFolderNode(folder, docs, currentId, query) {
  // While searching every matching folder is shown open; the stored collapsed state is left alone.
  const expanded = !folder || !folder.collapsed || Boolean(query);
  const group = document.createElement("div");
  group.className = "library-folder";
  group.setAttribute("role", "treeitem");
  group.setAttribute("aria-level", "1");
  group.setAttribute("aria-selected", "false");
  group.setAttribute("aria-expanded", String(expanded));
  group.tabIndex = -1;
  group.dataset.folderId = folder?.id || "";
  group.dataset.treeKey = `folder:${folder?.id || ""}`;
  if (!folder && !docs.length) group.classList.add("unfiled-empty");

  const head = document.createElement("div");
  head.className = "tree-row library-folder-head";
  head.innerHTML = `
    <svg class="icon tree-chevron" aria-hidden="true"><use href="#sr-chevron-right"></use></svg>
    <svg class="icon tree-folder" aria-hidden="true"><use href="#${folder ? "sr-folder" : "sr-archive"}"></use></svg>
    <span class="tree-label"></span>
    <span class="tree-count">${docs.length}</span>
  `;
  head.querySelector(".tree-label").textContent = folder?.name || t("unfiled");
  group.appendChild(head);

  const list = document.createElement("div");
  list.className = "library-folder-texts";
  list.setAttribute("role", "group");
  docs.forEach((doc) => list.appendChild(createLibraryTextNode(doc, currentId, folder)));
  if (!docs.length) {
    const empty = document.createElement("div");
    empty.className = "library-folder-empty";
    empty.textContent = t("folderEmpty");
    list.appendChild(empty);
  }
  group.appendChild(list);

  group.addEventListener("dragover", (event) => {
    if (![...event.dataTransfer.types].includes(TEXT_DRAG_TYPE)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    group.classList.add("drop-target");
  });
  group.addEventListener("dragleave", (event) => {
    if (!group.contains(event.relatedTarget)) group.classList.remove("drop-target");
  });
  group.addEventListener("drop", (event) => {
    const textId = event.dataTransfer.getData(TEXT_DRAG_TYPE);
    if (!textId) return;
    event.preventDefault();
    event.stopPropagation();
    group.classList.remove("drop-target");
    if (folder?.collapsed) folder.collapsed = false;
    moveLibraryText(textId, folder?.id || "");
  });
  return group;
}

function createLibraryTextNode(doc, currentId, folder) {
  const item = document.createElement("div");
  item.className = `library-text ${doc.id === currentId ? "active" : ""}`;
  item.setAttribute("role", "treeitem");
  item.setAttribute("aria-level", "2");
  item.setAttribute("aria-selected", String(doc.id === currentId));
  item.tabIndex = -1;
  item.dataset.textId = doc.id;
  item.dataset.treeKey = `text:${doc.id}`;
  item.draggable = true;
  const meta = libraryTextMeta(doc);
  item.title = [[doc.title, doc.level, doc.topic].filter(Boolean).join(" · "), meta].filter(Boolean).join("\n");
  item.addEventListener("dragstart", (event) => {
    draggedTextId = doc.id;
    event.dataTransfer.setData(TEXT_DRAG_TYPE, doc.id);
    event.dataTransfer.effectAllowed = "move";
    item.classList.add("dragging");
    els.libraryList.classList.add("dragging");
  });
  item.addEventListener("dragend", () => {
    draggedTextId = "";
    item.classList.remove("dragging");
    els.libraryList.classList.remove("dragging");
    document.querySelectorAll(".library-folder.drop-target").forEach((node) => node.classList.remove("drop-target"));
  });

  const row = document.createElement("div");
  row.className = "tree-row tree-row-text";
  row.innerHTML = `<svg class="icon tree-doc" aria-hidden="true"><use href="#sr-doc"></use></svg><span class="tree-label"></span>`;
  const titles = splitTitle(displayTitle(doc, folder));
  const label = row.querySelector(".tree-label");
  label.textContent = titles.de || titles.ru;
  label.lang = titles.de ? "de" : "ru";
  item.appendChild(row);
  return item;
}

/* Tree behaviour: click, roving tabindex, arrow keys, right-click menu, inline rename */

function treeItems() {
  return [...els.libraryList.querySelectorAll('[role="treeitem"]')].filter((item) => item.offsetParent !== null);
}

function treeItemByKey(key) {
  return key ? [...els.libraryList.querySelectorAll('[role="treeitem"]')].find((item) => item.dataset.treeKey === key) : null;
}

// One tabbable row: the last focused row, else the open text, else the first row.
function updateTreeTabStop(refocus) {
  const items = treeItems();
  const target = treeItemByKey(treeFocusKey) || els.libraryList.querySelector('[aria-selected="true"]') || items[0];
  items.forEach((item) => item.tabIndex = item === target ? 0 : -1);
  if (target && refocus) target.focus({ preventScroll: true });
}

function focusTreeItem(item) {
  if (!item) return;
  treeFocusKey = item.dataset.treeKey;
  els.libraryList.querySelectorAll('[role="treeitem"]').forEach((node) => node.tabIndex = node === item ? 0 : -1);
  item.focus();
  item.querySelector(".tree-row")?.scrollIntoView({ block: "nearest" });
}

function folderForItem(item) {
  return libraryFolders.find((folder) => folder.id === item?.dataset.folderId) || null;
}

function setFolderExpanded(item, expanded) {
  const folder = folderForItem(item);
  if (!folder || (els.librarySearch.value.trim() && !expanded)) return;
  folder.collapsed = !expanded;
  treeFocusKey = item.dataset.treeKey;
  saveLibraryState();
  renderTextOptions();
  treeItemByKey(treeFocusKey)?.focus();
}

function activateTreeItem(item) {
  if (!item) return;
  treeFocusKey = item.dataset.treeKey;
  if (item.dataset.textId) {
    const doc = library.find((entry) => entry.id === item.dataset.textId);
    if (doc) selectLibraryText(doc);
    treeItemByKey(treeFocusKey)?.focus();
    return;
  }
  setFolderExpanded(item, item.getAttribute("aria-expanded") !== "true");
}

function bindLibraryTree() {
  els.libraryList.addEventListener("click", (event) => {
    if (event.target.closest(".tree-rename")) return;
    const item = event.target.closest('[role="treeitem"]');
    if (!item || event.target.closest(".library-folder-empty")) return;
    event.stopPropagation();
    activateTreeItem(event.target.closest(".tree-row") ? item : null);
  });
  els.libraryList.addEventListener("focusin", (event) => {
    const item = event.target.closest('[role="treeitem"]');
    if (item) treeFocusKey = item.dataset.treeKey;
  });
  els.libraryList.addEventListener("keydown", (event) => {
    if (event.target.closest(".tree-rename")) return;
    const item = document.activeElement?.closest?.('[role="treeitem"]');
    if (!item) return;
    const items = treeItems();
    const index = items.indexOf(item);
    const isFolder = item.hasAttribute("aria-expanded");
    const open = item.getAttribute("aria-expanded") === "true";
    if (event.key === "ArrowDown") focusTreeItem(items[index + 1]);
    else if (event.key === "ArrowUp") focusTreeItem(items[index - 1]);
    else if (event.key === "Home") focusTreeItem(items[0]);
    else if (event.key === "End") focusTreeItem(items.at(-1));
    else if (event.key === "ArrowRight" && isFolder) {
      if (open) focusTreeItem(items[index + 1]?.getAttribute("aria-level") === "2" ? items[index + 1] : item);
      else setFolderExpanded(item, true);
    } else if (event.key === "ArrowLeft") {
      if (isFolder && open) setFolderExpanded(item, false);
      else focusTreeItem(item.parentElement.closest('[role="treeitem"]'));
    } else if (event.key === "Enter" || event.key === " ") activateTreeItem(item);
    else if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
      const rect = item.querySelector(".tree-row").getBoundingClientRect();
      openTreeContextMenu(item, rect.left + 24, rect.bottom);
    } else return;
    event.preventDefault();
  });
  els.libraryList.addEventListener("contextmenu", (event) => {
    const item = event.target.closest('[role="treeitem"]');
    if (!item || event.target.closest(".tree-rename") || event.target.closest(".library-folder-empty")) return;
    event.preventDefault();
    openTreeContextMenu(item, event.clientX, event.clientY);
  });
  // Touch screens have no right click: a long press opens the same menu.
  els.libraryList.addEventListener("touchstart", (event) => {
    const item = event.target.closest('[role="treeitem"]');
    if (!item) return;
    const touch = event.touches[0];
    window.clearTimeout(treeLongPressTimer);
    treeLongPressTimer = window.setTimeout(() => openTreeContextMenu(item, touch.clientX, touch.clientY), 500);
  }, { passive: true });
  ["touchend", "touchmove", "touchcancel"].forEach((type) => {
    els.libraryList.addEventListener(type, () => window.clearTimeout(treeLongPressTimer), { passive: true });
  });
}

function openTreeContextMenu(item, x, y) {
  const textId = item.dataset.textId;
  const folder = folderForItem(item);
  let entries;
  if (textId) {
    const doc = library.find((entry) => entry.id === textId);
    if (!doc) return;
    entries = [
      { label: t("openText"), action: () => { selectLibraryText(doc); treeItemByKey(`text:${doc.id}`)?.focus(); } },
      { label: t("rename"), action: () => startInlineRename(`text:${doc.id}`) },
      { label: t("moveTo"), submenu: [{ id: "", name: t("unfiled") }, ...libraryFolders].map((target) => ({
        label: target.name,
        checked: (doc.folderId || "") === target.id || (!target.id && !libraryFolders.some((entry) => entry.id === doc.folderId)),
        action: () => moveLibraryText(doc.id, target.id)
      })) },
      { label: t("exportText"), action: () => exportTextFile(doc) },
      { separator: true },
      { label: t("deleteTextMenu"), danger: true, action: () => deleteLibraryText(doc.id) }
    ];
  } else if (folder) {
    entries = [
      { label: t("addToFolder"), action: () => openDrawer(true, folder.id) },
      { label: t("rename"), action: () => startInlineRename(`folder:${folder.id}`) },
      { separator: true },
      { label: t("deleteFolderMenu"), danger: true, action: () => deleteLibraryFolder(folder.id) }
    ];
  } else return;
  treeFocusKey = item.dataset.treeKey;
  item.classList.add("menu-target");
  showContextMenu(entries, x, y, item);
}

let contextMenuReturnFocus = null;

function showContextMenu(entries, x, y, returnFocus) {
  closeContextMenu();
  contextMenuReturnFocus = returnFocus || null;
  const menu = els.contextMenu;
  menu.replaceChildren(buildMenuList(entries));
  menu.hidden = false;
  menu.setAttribute("aria-label", t("actions"));
  placeMenu(menu, x, y);
  menu.querySelector('[role="menuitem"]')?.focus();
}

function buildMenuList(entries) {
  const fragment = document.createDocumentFragment();
  entries.forEach((entry) => {
    if (entry.separator) {
      const line = document.createElement("div");
      line.className = "menu-separator";
      line.setAttribute("role", "separator");
      fragment.appendChild(line);
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = `menu-item ${entry.danger ? "danger" : ""} ${entry.submenu ? "has-submenu" : ""}`;
    button.setAttribute("role", entry.checked === undefined ? "menuitem" : "menuitemradio");
    if (entry.checked !== undefined) button.setAttribute("aria-checked", String(entry.checked));
    button.tabIndex = -1;
    button.innerHTML = `<span class="menu-check" aria-hidden="true">${entry.checked ? "✓" : ""}</span><span class="menu-label"></span>${entry.submenu ? `<svg class="icon menu-arrow" aria-hidden="true"><use href="#sr-chevron-right"></use></svg>` : ""}`;
    button.querySelector(".menu-label").textContent = entry.label;
    if (entry.submenu) {
      button.setAttribute("aria-haspopup", "menu");
      button.setAttribute("aria-expanded", "false");
      const open = () => openSubmenu(button, entry.submenu);
      button.addEventListener("click", (event) => { event.stopPropagation(); open(); button.nextElementSibling?.querySelector('[role^="menuitem"]')?.focus(); });
      button.addEventListener("mouseenter", () => { open(); button.focus(); });
    } else {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        closeContextMenu();
        entry.action();
      });
      button.addEventListener("mouseenter", () => {
        if (!button.closest(".submenu")) closeSubmenus(button.parentElement);
        button.focus();
      });
    }
    fragment.appendChild(button);
  });
  return fragment;
}

function openSubmenu(button, entries) {
  const parent = button.parentElement;
  if (button.getAttribute("aria-expanded") === "true") return;
  closeSubmenus(parent);
  const submenu = document.createElement("div");
  submenu.className = "context-menu submenu";
  submenu.setAttribute("role", "menu");
  submenu.appendChild(buildMenuList(entries));
  button.after(submenu);
  button.setAttribute("aria-expanded", "true");
  const rect = button.getBoundingClientRect();
  submenu.style.position = "fixed";
  placeMenu(submenu, rect.right - 2, rect.top - 5, rect.left + 2);
}

function closeSubmenus(container) {
  container.querySelectorAll(":scope > .submenu").forEach((node) => node.remove());
  container.querySelectorAll(':scope > [aria-expanded="true"]').forEach((node) => node.setAttribute("aria-expanded", "false"));
}

function placeMenu(menu, x, y, flipX) {
  const box = menu.getBoundingClientRect();
  let left = x;
  if (left + box.width > window.innerWidth - 8) left = flipX !== undefined ? flipX - box.width : window.innerWidth - box.width - 8;
  const top = Math.min(y, window.innerHeight - box.height - 8);
  menu.style.left = `${Math.max(8, left)}px`;
  menu.style.top = `${Math.max(8, top)}px`;
}

function closeContextMenu(restoreFocus) {
  if (!els.contextMenu || els.contextMenu.hidden) return;
  els.contextMenu.hidden = true;
  els.contextMenu.replaceChildren();
  document.querySelectorAll(".menu-target").forEach((node) => node.classList.remove("menu-target"));
  if (restoreFocus === true && contextMenuReturnFocus?.isConnected) contextMenuReturnFocus.focus();
  contextMenuReturnFocus = null;
}

function bindContextMenuKeys() {
  els.contextMenu.addEventListener("keydown", (event) => {
    const current = document.activeElement;
    const list = current?.parentElement;
    if (!list) return;
    const items = [...list.querySelectorAll(':scope > [role^="menuitem"]')];
    const index = items.indexOf(current);
    if (event.key === "ArrowDown") items[(index + 1) % items.length]?.focus();
    else if (event.key === "ArrowUp") items[(index - 1 + items.length) % items.length]?.focus();
    else if (event.key === "ArrowRight" && current.classList.contains("has-submenu")) current.click();
    else if (event.key === "ArrowLeft" && list.classList.contains("submenu")) {
      const owner = list.previousElementSibling;
      closeSubmenus(list.parentElement);
      owner?.focus();
    } else if (event.key === "Tab") closeContextMenu(true);
    else return;
    event.preventDefault();
  });
}

// Rename in place: the label becomes an input; Enter or leaving the field saves, Escape cancels.
function startInlineRename(key) {
  const item = treeItemByKey(key);
  const label = item?.querySelector(":scope > .tree-row .tree-label");
  if (!label) return;
  const isText = key.startsWith("text:");
  const id = key.slice(key.indexOf(":") + 1);
  const doc = isText ? library.find((entry) => entry.id === id) : null;
  const folder = isText ? null : libraryFolders.find((entry) => entry.id === id);
  if (!doc && !folder) return;
  item.draggable = false;
  const input = document.createElement("input");
  input.className = "tree-rename";
  input.value = doc ? doc.title : folder.name;
  input.setAttribute("aria-label", t(doc ? "textName" : "folderName"));
  label.replaceWith(input);
  input.focus();
  input.select();
  let finished = false;
  const finish = (save) => {
    if (finished) return;
    finished = true;
    const name = input.value.trim();
    treeFocusKey = key;
    if (save && name && name !== (doc ? doc.title : folder.name)) {
      if (doc) renameLibraryText(doc.id, name);
      else renameLibraryFolder(folder.id, name);
    } else renderTextOptions();
    treeItemByKey(key)?.focus();
  };
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key === "Enter") { event.preventDefault(); finish(true); }
    if (event.key === "Escape") { event.preventDefault(); finish(false); }
  });
  input.addEventListener("blur", () => finish(true));
  input.addEventListener("click", (event) => event.stopPropagation());
}

/* Sidebar width: drag the right edge, 220-360px, remembered per browser */

function bindLibraryResize() {
  const apply = (width) => {
    const value = Math.round(Math.min(SIDEBAR_WIDTH.max, Math.max(SIDEBAR_WIDTH.min, width)));
    els.appRoot.style.setProperty("--sidebar-w", `${value}px`);
    return value;
  };
  apply(Number(localStorage.getItem(SIDEBAR_WIDTH.key)) || SIDEBAR_WIDTH.fallback);
  els.libraryResize.addEventListener("pointerdown", (event) => {
    if (narrowLayout.matches || event.button !== 0) return;
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = els.libraryPanel.getBoundingClientRect().width;
    els.libraryResize.setPointerCapture(event.pointerId);
    els.appRoot.classList.add("is-resizing");
    let width = startWidth;
    const move = (moveEvent) => { width = apply(startWidth + moveEvent.clientX - startX); };
    const up = () => {
      els.libraryResize.removeEventListener("pointermove", move);
      els.libraryResize.removeEventListener("pointerup", up);
      els.libraryResize.removeEventListener("pointercancel", up);
      els.appRoot.classList.remove("is-resizing");
      localStorage.setItem(SIDEBAR_WIDTH.key, String(width));
    };
    els.libraryResize.addEventListener("pointermove", move);
    els.libraryResize.addEventListener("pointerup", up);
    els.libraryResize.addEventListener("pointercancel", up);
  });
  els.libraryResize.addEventListener("dblclick", () => {
    apply(SIDEBAR_WIDTH.fallback);
    localStorage.removeItem(SIDEBAR_WIDTH.key);
  });
}

function libraryTextMeta(doc) {
  const reads = textReads(doc.id);
  const cards = flashcards.filter((card) => card.textId === doc.id).length;
  const marked = activeReads[doc.id]?.marked.length || 0;
  const parts = [];
  if (reads.length) parts.push(`${plural(reads.length, "readsUnit")} · ${t("lastUnknown", { count: reads.at(-1).unknown })}`);
  if (marked) parts.push(t("inProgress", { count: marked }));
  else if (cards) parts.push(plural(cards, "cardsUnit"));
  return parts.join(" · ");
}

// "Wicos Neg A2: Geld und Bank / ..." inside folder "Wicos Neg A2" shows as "Geld und Bank / ...".
function displayTitle(doc, folder) {
  const title = String(doc?.title || "");
  const folderName = (folder || libraryFolders.find((item) => item.id === doc?.folderId))?.name;
  if (folderName && title.toLocaleLowerCase().startsWith(`${folderName.toLocaleLowerCase()}:`)) {
    return title.slice(folderName.length + 1).trim() || title;
  }
  return title;
}

function selectLibraryText(doc) {
  currentDocument = structuredClone(doc);
  persistCurrentDocument();
  renderTextOptions();
  render();
  els.reader.scrollTop = 0;
  setLibrarySheet(false);
  if (activeView !== "reading") setView("reading");
}

function exportTextFile(doc) {
  try {
    const { text } = textFormat.serializeInline(compactDocumentForStorage(doc));
    downloadFile(`${String(doc.title || doc.id).split(" / ").pop().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || doc.id}.txt`, text, "text/plain;charset=utf-8");
  } catch (error) {
    setStatus(error.message);
  }
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function upsertDocument(doc) {
  normalizeDocument(doc);
  doc.folderId = findUsableFolderId(doc.folderId) || defaultFolderIdForDoc(doc);
  const index = library.findIndex((item) => item.id === doc.id);
  if (index >= 0) library[index] = structuredClone(doc);
  else library.unshift(structuredClone(doc));
  saveLibraryState();
  renderTextOptions();
}

function deleteLibraryText(docId) {
  if (!library.some((doc) => doc.id === docId) || !confirm(t("deleteTextConfirm"))) return;
  library = library.filter((doc) => doc.id !== docId);
  if (currentDocument?.id === docId) currentDocument = library[0] ? structuredClone(library[0]) : null;
  saveLibraryState();
  persistCurrentDocument();
  renderTextOptions();
  render();
  setStatus(t("deleted"));
}

function deleteLibraryFolder(folderId) {
  const folder = libraryFolders.find((item) => item.id === folderId);
  if (!folder || !confirm(t("deleteFolderConfirm"))) return;
  libraryFolders = libraryFolders.filter((item) => item.id !== folderId);
  library.forEach((doc) => {
    if (doc.folderId === folderId) doc.folderId = "";
  });
  if (currentDocument?.folderId === folderId) currentDocument.folderId = "";
  saveLibraryState();
  renderTextOptions();
  setStatus(t("folderDeleted"));
}

function openLibraryDialog(mode, targetId = "") {
  libraryDialogState = { mode, targetId };
  const isMove = mode === "move-text";
  const folder = mode === "rename-folder" ? libraryFolders.find((item) => item.id === targetId) : null;
  const doc = mode === "rename-text" || isMove ? library.find((item) => item.id === targetId) : null;
  if ((mode === "rename-folder" && !folder) || ((mode === "rename-text" || isMove) && !doc)) return;
  const titleKeys = {
    "new-folder": "newFolder",
    "rename-folder": "renameFolder",
    "rename-text": "renameLibraryText",
    "move-text": "moveLibraryText"
  };
  els.libraryDialogTitle.textContent = t(titleKeys[mode]);
  els.libraryDialogNameField.hidden = isMove;
  els.libraryDialogFolderField.hidden = !isMove;
  els.libraryDialogLabel.textContent = t(mode.includes("folder") ? "folderName" : "textName");
  els.libraryDialogName.value = folder?.name || doc?.title || "";
  els.libraryDialogSubmit.textContent = isMove ? t("moveLibraryText") : t(mode === "new-folder" ? "newFolder" : "save");
  if (isMove) populateLibraryFolderSelect(doc.folderId || "");
  els.libraryDialog.showModal();
  if (!isMove) els.libraryDialogName.focus();
}

function populateLibraryFolderSelect(selectedId) {
  els.libraryDialogFolder.innerHTML = "";
  const unfiled = document.createElement("option");
  unfiled.value = "";
  unfiled.textContent = t("unfiled");
  if (!selectedId) unfiled.selected = true;
  els.libraryDialogFolder.appendChild(unfiled);
  libraryFolders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name;
    if (folder.id === selectedId) option.selected = true;
    els.libraryDialogFolder.appendChild(option);
  });
}

function submitLibraryDialog(event) {
  event.preventDefault();
  if (!libraryDialogState) return;
  const { mode, targetId } = libraryDialogState;
  const name = els.libraryDialogName.value.trim();
  if (mode !== "move-text" && !name) {
    els.libraryDialogName.focus();
    return;
  }
  if (mode === "new-folder") {
    libraryFolders.push({ id: createFolderId(), name });
    saveLibraryState();
    renderTextOptions();
    setStatus(t("folderAdded"));
  }
  if (mode === "rename-folder") renameLibraryFolder(targetId, name);
  if (mode === "rename-text") renameLibraryText(targetId, name);
  if (mode === "move-text") moveLibraryText(targetId, els.libraryDialogFolder.value);
  closeLibraryDialog();
}

function closeLibraryDialog() {
  libraryDialogState = null;
  if (els.libraryDialog.open) els.libraryDialog.close();
}

function renameLibraryFolder(folderId, name) {
  const folder = libraryFolders.find((item) => item.id === folderId);
  if (!folder) return;
  folder.name = name;
  saveLibraryState();
  renderTextOptions();
  setStatus(t("folderRenamed"));
}

function renameLibraryText(docId, name) {
  const doc = library.find((item) => item.id === docId);
  if (!doc) return;
  doc.title = name;
  if (currentDocument?.id === doc.id) currentDocument.title = name;
  saveLibraryState();
  renderTextOptions();
  render();
  setStatus(t("textRenamed"));
}

function moveLibraryText(docId, folderId) {
  const doc = library.find((item) => item.id === docId);
  if (!doc) return;
  doc.folderId = findUsableFolderId(folderId);
  if (currentDocument?.id === doc.id) currentDocument.folderId = doc.folderId;
  saveLibraryState();
  renderTextOptions();
  setStatus(t("textMoved"));
}

function createFolderId() {
  return `folder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ---------- Export, backup, reset ---------- */

async function copyAnki() {
  const tsv = buildAnkiTsv(flashcards);
  if (!tsv) return setStatus(t("noWords"));
  try {
    await navigator.clipboard.writeText(tsv);
    setStatus(t("copiedAnki"));
  } catch {
    setStatus("Clipboard unavailable");
  }
}

function downloadAnki() {
  const tsv = buildAnkiTsv(flashcards);
  if (!tsv) return setStatus(t("noWords"));
  downloadFile(`sync-reader-anki-${new Date().toISOString().slice(0, 10)}.tsv`, tsv, "text/tab-separated-values;charset=utf-8");
  setStatus(t("downloaded"));
}

function exportBackup() {
  const data = {};
  Object.keys(localStorage).filter((key) => key.startsWith("sync-reader-")).forEach((key) => {
    data[key] = localStorage.getItem(key);
  });
  const backup = { app: "sync-reader", version: 1, exportedAt: new Date().toISOString(), data };
  downloadFile(`sync-reader-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(backup), "application/json");
  setStatus(t("backupSaved"));
}

async function importBackupFile() {
  const file = els.backupFile.files?.[0];
  els.backupFile.value = "";
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    if (backup?.app !== "sync-reader" || typeof backup.data !== "object") throw new Error(t("backupInvalid"));
    if (!confirm(t("backupConfirm"))) return;
    Object.keys(localStorage).filter((key) => key.startsWith("sync-reader-")).forEach((key) => localStorage.removeItem(key));
    Object.entries(backup.data).forEach(([key, value]) => {
      if (key.startsWith("sync-reader-") && typeof value === "string") localStorage.setItem(key, value);
    });
    location.reload();
  } catch (error) {
    setStatus(error.message || t("backupInvalid"));
  }
}

function resetLocalData() {
  if (!confirm(t("resetConfirm"))) return;
  Object.keys(localStorage)
    .filter((key) => key.startsWith("sync-reader-"))
    .forEach((key) => localStorage.removeItem(key));
  resetLibraryToBundledTexts();
  flashcards = [];
  wordHistory = [];
  activeReads = {};
  readLog = [];
  activeView = "reading";
  applyPrefs();
  renderTextOptions();
  render();
  renderWords();
  renderStats();
  setView("reading");
  setStatus(t("resetDone"));
}

function buildAnkiTsv(cards) {
  return cards.map((card) => {
    const context = cardContexts(card)[0];
    return [
      [
        `${escapeHtml(card.source)} (${card.lang.toUpperCase()})`,
        context?.sentence ? `<small>${highlightPhrase(context.sentence, card.source).replace(/<mark>/g, "<b>").replace(/<\/mark>/g, "</b>")}</small>` : ""
      ].filter(Boolean).join("<br><br>"),
      [
        escapeHtml(card.translation),
        context?.sentenceTranslation ? `<i>${escapeHtml(context.sentenceTranslation)}</i>` : "",
        escapeHtml(uniqueExplanations(card.note, card.formTip)),
        escapeHtml(card.sentenceNote)
      ].filter(Boolean).join("<br><br>"),
      `sync-reader ${card.lang} ${card.textId}`
    ].map(tsvCell).join("\t");
  }).join("\n");
}

function findSentenceForToken(paragraph, token, side) {
  if (paragraph.sentences?.[token.sentenceIndex]) {
    return paragraph.sentences[token.sentenceIndex][side] || "";
  }
  const text = paragraph[side] || "";
  const phrase = token[side] || "";
  if (!text || !phrase) return "";
  const parts = side === "left" ? token.leftParts : token.rightParts;
  const index = [phrase, ...(parts || [])].map((part) => text.indexOf(part)).filter((item) => item >= 0).sort((a, b) => a - b)[0] ?? -1;
  if (index < 0) return text;
  const before = text.slice(0, index);
  const start = Math.max(before.lastIndexOf("."), before.lastIndexOf("!"), before.lastIndexOf("?")) + 1;
  const after = text.slice(index);
  const ends = [after.indexOf("."), after.indexOf("!"), after.indexOf("?")].filter((item) => item >= 0);
  const end = ends.length ? index + Math.min(...ends) + 1 : text.length;
  return text.slice(start, end).trim();
}

function normalizeDocument(doc) {
  const rawParagraphs = doc?.p || doc?.paragraphs;
  if (!doc || !Array.isArray(rawParagraphs)) throw new Error("Document must have a p array.");
  doc.id = doc.id || `doc-${Date.now()}`;
  doc.title = doc.title || "Untitled";
  doc.level = doc.level || "A2";
  doc.topic = doc.topic || "reading";
  doc.source = doc.source || "local";
  doc.paragraphs = rawParagraphs.map((paragraph, paragraphIndex) => normalizeParagraph(paragraph, paragraphIndex));
  return doc;
}

function normalizeParagraph(paragraph, paragraphIndex) {
  const fromArray = Array.isArray(paragraph);
  const id = fromArray ? paragraph[0] : paragraph.id;
  const rawSentences = textFormat.isSentenceParagraph(paragraph)
    ? (fromArray ? paragraph[1] : (paragraph.s || paragraph.sentences))
    : null;
  if (rawSentences) return normalizeSentenceParagraph(id, rawSentences, paragraphIndex);
  const left = fromArray ? paragraph[1] : (paragraph.ru || paragraph.left || "");
  const right = fromArray ? paragraph[2] : (paragraph.de || paragraph.right || "");
  const pairs = fromArray ? paragraph[3] : (paragraph.pairs || paragraph.a || []);
  const normalized = {
    id: id || `p${paragraphIndex + 1}`,
    left: String(left || ""),
    right: String(right || ""),
    pairs: Array.isArray(pairs) ? pairs : [],
    tokens: []
  };
  normalized.tokens = mergeGermanDeterminers(
    normalized.pairs.map((pair, pairIndex) => normalizePair(pair, normalized.id, pairIndex)).filter((token) => token.left && token.right),
    normalized.id
  );
  return normalized;
}

function normalizeSentenceParagraph(id, rawSentences, paragraphIndex) {
  const normalized = {
    id: id || `p${paragraphIndex + 1}`,
    left: "",
    right: "",
    pairs: [],
    sentences: [],
    tokens: []
  };
  rawSentences.forEach((rawSentence) => {
    const sentence = textFormat.getParagraphSentences(["sentence", [rawSentence]])[0];
    if (!sentence) return;
    normalized.sentences.push({
      left: sentence.left,
      right: sentence.right,
      pairs: sentence.pairs
    });
  });
  normalized.left = normalized.sentences.map((sentence) => sentence.left).join(" ");
  normalized.right = normalized.sentences.map((sentence) => sentence.right).join(" ");
  let pairIndex = 0;
  normalized.sentences.forEach((sentence, sentenceIndex) => {
    sentence.pairs.forEach((pair) => {
      normalized.pairs.push(pair);
      normalized.tokens.push(normalizePair(pair, normalized.id, pairIndex, sentenceIndex));
      pairIndex += 1;
    });
  });
  normalized.tokens = mergeGermanDeterminers(normalized.tokens.filter((token) => token.left && token.right), normalized.id);
  return normalized;
}

function normalizePair(pair, paragraphId, pairIndex, sentenceIndex = -1) {
  const fromArray = Array.isArray(pair);
  const rightValue = fromArray ? pair[0] : (pair.de || pair.right || "");
  const leftValue = fromArray ? pair[1] : (pair.ru || pair.left || "");
  const note = fromArray ? pair[2] : (pair.tip || pair.note || "");
  const formTip = fromArray ? pair[3] : (pair.formTip || "");
  const sentenceNote = fromArray ? pair[4] : (pair.sentenceTip || pair.sentenceNote || "");
  const rightParts = visibleParts(rightValue);
  const leftParts = visibleParts(leftValue);
  return {
    id: `${paragraphId}a${pairIndex + 1}`,
    left: leftParts.join(" "),
    right: rightParts.join(" "),
    leftParts,
    rightParts,
    note: note || "",
    formTip: formTip || "",
    sentenceNote: sentenceNote || "",
    sentenceIndex
  };
}

function visibleParts(value) {
  if (Array.isArray(value)) return value.flatMap(visibleParts).filter(Boolean);
  return value ? [String(value)] : [];
}

function mergeGermanDeterminers(tokens, paragraphId) {
  const merged = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const next = tokens[index + 1];
    if (next && token.sentenceIndex === next.sentenceIndex && isGermanDeterminer(token.right) && normalKey(token.left) === normalKey(next.left)) {
      merged.push({
        ...next,
        id: `${paragraphId}a${merged.length + 1}`,
        right: [...token.rightParts, ...next.rightParts].join(" "),
        rightParts: [...token.rightParts, ...next.rightParts],
        note: uniqueExplanations(token.note, next.note),
        formTip: uniqueExplanations(token.formTip, next.formTip),
        sentenceNote: uniqueExplanations(token.sentenceNote, next.sentenceNote)
      });
      index += 1;
    } else {
      merged.push({ ...token, id: `${paragraphId}a${merged.length + 1}` });
    }
  }
  return merged;
}

function isGermanDeterminer(value) {
  return /^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|kein|keine|keinen|keinem|keiner|keines|mein|meine|meinen|meinem|meiner|meines|dein|deine|deinen|deinem|deiner|deines|sein|seine|seinen|seinem|seiner|seines|ihr|ihre|ihren|ihrem|ihrer|ihres|dieser|diese|dieses|diesen|diesem|jeder|jede|jedes|jeden|jedem|welcher|welche|welches|welchen|welchem)$/i.test(String(value || "").trim());
}

function countTokens(side) {
  if (!currentDocument) return 0;
  return currentDocument.paragraphs.reduce((sum, paragraph) => sum + paragraph.tokens.filter((token) => token[side]).length, 0);
}

function findToken(tokenId) {
  if (!currentDocument) return null;
  for (const paragraph of currentDocument.paragraphs) {
    const token = paragraph.tokens.find((item) => item.id === tokenId);
    if (token) return token;
  }
  return null;
}

function findParagraphForToken(tokenId) {
  if (!currentDocument) return null;
  return currentDocument.paragraphs.find((paragraph) => paragraph.tokens.some((token) => token.id === tokenId));
}

function findSentenceForCard(card) {
  const doc = library.find((item) => item.id === card.textId);
  if (!doc) return "";
  const paragraph = doc.paragraphs.find((item) => item.tokens.some((token) => token.id === card.tokenId));
  if (!paragraph) return "";
  const token = paragraph.tokens.find((item) => item.id === card.tokenId);
  if (!token) return "";
  return findSentenceForToken(paragraph, token, card.lang === "ru" ? "left" : "right");
}


function loadLibrary() {
  const saved = loadJson(STORAGE.library, null);
  if (Array.isArray(saved)) {
    return saved.filter((doc) => !REMOVED_BUNDLED_TEXT_IDS.has(doc.id)).map(normalizeDocument);
  }
  return structuredClone(seedTexts);
}

function loadLibraryFolders(docs) {
  const saved = loadJson(STORAGE.folders, null);
  const folders = Array.isArray(saved) ? saved.map(normalizeLibraryFolder).filter(Boolean) : defaultLibraryFolders();
  docs.forEach((doc) => {
    doc.folderId = findFolderIdIn(doc.folderId, folders) || defaultFolderIdForDoc(doc, folders);
  });
  return folders;
}

function normalizeLibraryFolder(folder, index) {
  if (!folder || !String(folder.name || "").trim()) return null;
  const id = String(folder.id || `folder-${index + 1}`);
  return {
    id,
    name: id === "wicos-neg" && String(folder.name).trim() === "Wicos Neg" ? "Wicos Neg A2" : String(folder.name).trim(),
    collapsed: !!folder.collapsed
  };
}

function defaultLibraryFolders() {
  return structuredClone(DEFAULT_LIBRARY_FOLDERS);
}

async function loadExternalTexts() {
  if (Array.isArray(loadJson(STORAGE.library, null))) {
    mergeBundledLibraryAdditions(loadScriptedTextBank());
    return;
  }
  const scriptedTexts = loadScriptedTextBank();
  if (scriptedTexts.length) {
    replaceLibraryWithExternalTexts(scriptedTexts);
    if (location.protocol === "file:") return;
  }
  const files = await discoverExternalTextFiles();
  if (!files.length) {
    setStatus("Text bank index was not found.");
    return;
  }
  const loaded = [];
  const failed = [];
  for (const file of files) {
    const data = await fetchTextDocument(`${TEXT_FOLDER}/${file}`);
    if (!data) {
      failed.push(file);
      continue;
    }
    const docs = Array.isArray(data) ? data : [data];
    docs.forEach((doc) => {
      try {
        const normalized = normalizeDocument(structuredClone(doc));
        normalized.source = normalized.source || `${TEXT_FOLDER}/${file}`;
        loaded.push(normalized);
      } catch {
        failed.push(file);
      }
    });
  }
  if (!loaded.length) {
    setStatus("No text bank files could be loaded.");
    return;
  }
  replaceLibraryWithExternalTexts(loaded);
  if (failed.length) setStatus(`Skipped text files: ${failed.join(", ")}`);
}

function mergeBundledLibraryAdditions(docs) {
  const appliedIds = new Set(loadJson(STORAGE.bundledAdditions, []));
  let changed = false;
  docs.filter((doc) => BUNDLED_LIBRARY_ADDITION_IDS.has(doc.id)).forEach((doc) => {
    if (appliedIds.has(doc.id)) return;
    appliedIds.add(doc.id);
    if (library.some((saved) => saved.id === doc.id)) return;
    ensureLibraryFolder(doc.folderId);
    ensureLibraryFolder(LEVEL_FOLDER_IDS[String(doc.level || "").trim().toUpperCase()]);
    doc.folderId = defaultFolderIdForDoc(doc);
    library.push(doc);
    changed = true;
  });
  saveJson(STORAGE.bundledAdditions, [...appliedIds]);
  if (!changed) return;
  saveLibraryState();
  renderTextOptions();
  render();
}

function ensureLibraryFolder(folderId) {
  if (findFolderIdIn(folderId, libraryFolders)) return;
  const folder = DEFAULT_LIBRARY_FOLDERS.find((item) => item.id === folderId);
  if (folder) libraryFolders.push(structuredClone(folder));
}

function loadScriptedTextBank() {
  const texts = Array.isArray(window.SYNC_READER_TEXTS) ? window.SYNC_READER_TEXTS : [];
  const loaded = [];
  texts.forEach((doc) => {
    try {
      loaded.push(normalizeDocument(structuredClone(doc)));
    } catch {
      // Ignore malformed scripted text data; JSON import reports manual errors.
    }
  });
  return loaded;
}

async function discoverExternalTextFiles() {
  const manifest = await fetchTextJson(`${TEXT_FOLDER}/index.json`);
  if (Array.isArray(manifest)) return manifest.map((file) => String(file).trim()).filter(Boolean);
  return Array.from({ length: TEXT_FILE_LIMIT }, (_, index) => `${String(index + 1).padStart(3, "0")}.json`);
}

async function fetchTextDocument(path) {
  if (!/\.txt$/i.test(path)) return fetchTextJson(path);
  const source = await fetchTextSource(path);
  if (source === null) return null;
  const parsed = textFormat.parseInline(source);
  return parsed.errors.length ? null : parsed.doc;
}

async function fetchTextJson(path) {
  const source = await fetchTextSource(path);
  try {
    return source === null ? null : JSON.parse(source);
  } catch {
    return null;
  }
}

async function fetchTextSource(path) {
  try {
    const cacheBustedPath = location.protocol === "file:" ? path : `${path}${path.includes("?") ? "&" : "?"}v=${Date.now()}`;
    const response = await fetch(cacheBustedPath, { cache: "no-store" });
    if (!response.ok) return location.protocol === "file:" ? readLocalTextViaFrame(path) : null;
    return await response.text();
  } catch {
    return location.protocol === "file:" ? readLocalTextViaFrame(path) : null;
  }
}

function readLocalTextViaFrame(path) {
  return new Promise((resolve) => {
    const frame = document.createElement("iframe");
    let finished = false;
    const finish = (value) => {
      if (finished) return;
      finished = true;
      frame.remove();
      resolve(value);
    };
    frame.hidden = true;
    frame.onload = () => {
      try {
        finish(frame.contentDocument?.body?.textContent ?? null);
      } catch {
        finish(null);
      }
    };
    frame.onerror = () => finish(null);
    window.setTimeout(() => finish(null), 1200);
    frame.src = path;
    document.body.appendChild(frame);
  });
}

function replaceLibraryWithExternalTexts(docs) {
  const savedId = localStorage.getItem(STORAGE.currentId);
  const currentId = currentDocument?.id;
  const deduped = [];
  docs.forEach((doc) => {
    const index = deduped.findIndex((item) => item.id === doc.id);
    if (index >= 0) deduped[index] = structuredClone(doc);
    else deduped.push(structuredClone(doc));
  });
  library = deduped;
  libraryFolders = defaultLibraryFolders();
  library.forEach((doc) => {
    doc.folderId = defaultFolderIdForDoc(doc);
  });
  const preferred = library.find((item) => item.id === currentId) || library.find((item) => item.id === savedId) || library[0];
  currentDocument = preferred ? structuredClone(preferred) : null;
  saveLibraryState();
  persistCurrentDocument();
  renderTextOptions();
  render();
}

function resetLibraryToBundledTexts() {
  const docs = loadScriptedTextBank();
  library = docs.length ? docs : structuredClone(seedTexts).map(normalizeDocument);
  libraryFolders = defaultLibraryFolders();
  library.forEach((doc) => {
    doc.folderId = defaultFolderIdForDoc(doc);
  });
  currentDocument = library[0] ? structuredClone(library[0]) : null;
  saveLibraryState();
  persistCurrentDocument();
}

function loadCurrentDocument() {
  const savedId = localStorage.getItem(STORAGE.currentId);
  const doc = library.find((item) => item.id === savedId) || library[0];
  return doc ? structuredClone(doc) : null;
}

function persistCurrentDocument() {
  if (!currentDocument) {
    localStorage.removeItem(STORAGE.currentId);
    return;
  }
  localStorage.setItem(STORAGE.currentId, currentDocument.id);
}

function loadJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  const savedValue = key === STORAGE.library ? value.map(compactDocumentForStorage) : value;
  localStorage.setItem(key, JSON.stringify(savedValue));
}

function saveLibraryState() {
  saveJson(STORAGE.library, library);
  saveJson(STORAGE.folders, libraryFolders);
}

function compactDocumentForStorage(doc) {
  return {
    id: doc.id,
    title: doc.title,
    level: doc.level,
    topic: doc.topic,
    source: doc.source,
    folderId: doc.folderId || "",
    hintLanguage: doc.hintLanguage || "ru",
    p: doc.paragraphs.map((paragraph) => paragraph.sentences?.length
      ? [paragraph.id, paragraph.sentences.map((sentence) => [sentence.left, sentence.right, sentence.pairs])]
      : [paragraph.id, paragraph.left, paragraph.right, paragraph.pairs])
  };
}

function defaultFolderIdForDoc(doc, folders = libraryFolders) {
  const savedFolderId = findFolderIdIn(doc.folderId, folders);
  if (savedFolderId) return savedFolderId;
  const folderId = LEVEL_FOLDER_IDS[String(doc.level || "").trim().toUpperCase()] || "";
  return findFolderIdIn(folderId, folders);
}

function findUsableFolderId(folderId) {
  return findFolderIdIn(folderId, libraryFolders);
}

function findFolderIdIn(folderId, folders) {
  return folders.some((folder) => folder.id === folderId) ? folderId : "";
}


function tsvCell(value) {
  return String(value || "").replace(/\t/g, " ").replace(/\r?\n/g, "<br>").trim();
}

function normalKey(value) {
  return String(value || "").toLocaleLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value || "");
  return div.innerHTML;
}

function cssEscape(value) {
  if (window.CSS && CSS.escape) return CSS.escape(value);
  return String(value).replace(/"/g, "\\\"");
}

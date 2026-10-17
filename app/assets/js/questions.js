/* SkillProof MCQ bank: 10 questions x 5 subjects = 50. a = correct option index (shuffled at render). */
window.QUESTIONS = {
word: [
 {q:"MS Word mein text ko BOLD karne ki shortcut key kya hai?", o:["Ctrl+B","Ctrl+I","Ctrl+U","Ctrl+L"], a:0},
 {q:"Text ko center (darmiyan) mein karne ke liye?", o:["Ctrl+L","Ctrl+R","Ctrl+E","Ctrl+J"], a:2},
 {q:"Nayi document kholne ki shortcut?", o:["Ctrl+N","Ctrl+O","Ctrl+W","Ctrl+D"], a:0},
 {q:"Document print karne ki shortcut?", o:["Ctrl+P","Ctrl+R","Alt+P","Shift+P"], a:0},
 {q:"Aakhri kaam wapas karne (Undo) ke liye?", o:["Ctrl+Z","Ctrl+Y","Ctrl+X","Ctrl+U"], a:0},
 {q:"Word mein TABLE kahan se insert hota hai?", o:["Insert tab","Home tab","View tab","File tab"], a:0},
 {q:"Spelling check karne ki key kaunsi hai?", o:["F7","F5","F1","F12"], a:0},
 {q:"Document SAVE karne ki shortcut?", o:["Ctrl+S","Ctrl+D","Alt+S","Shift+S"], a:0},
 {q:"Font ka size BARHANE ke liye?", o:["Ctrl+Shift+>","Ctrl+Shift+<","Alt + +","Ctrl+F"], a:0},
 {q:"Page ka size (A4 / Letter) kahan se set hota hai?", o:["Layout tab","Home tab","Review tab","References tab"], a:0}
],
excel: [
 {q:"Excel mein jama (SUM) ka sahi formula kya hai?", o:["=SUM(A1:A5)","SUM(A1:A5)","#SUM(A1:A5)","+SUM(A1:A5)"], a:0},
 {q:"Cell ka address kaise banta hai?", o:["Column + Row, jaise B3","Row + Column, jaise 3B","Sirf number, jaise 3","Sirf letter, jaise B"], a:0},
 {q:"Average (ausat) nikalne ka formula?", o:["=AVERAGE()","=AVG()","=MEAN()","=MID()"], a:0},
 {q:"Excel mein har formula kis nishan se shuru hota hai?", o:["=","+","#","@"], a:0},
 {q:"Poori sheet select karne ki shortcut?", o:["Ctrl+A","Ctrl+S","Ctrl+E","Alt+A"], a:0},
 {q:"Ek hi cell mein nayi LINE ke liye?", o:["Alt+Enter","Ctrl+Enter","Shift+Enter","Tab"], a:0},
 {q:"Chart / Graph banane ke liye kaunsa tab?", o:["Insert","Home","Data","View"], a:0},
 {q:"Data ko FILTER karne ke liye kaunsa tab?", o:["Data","Home","Formulas","Review"], a:0},
 {q:"Nayi worksheet add karne ki shortcut?", o:["Shift+F11","Ctrl+N","Alt+N","F11"], a:0},
 {q:"=A1+A2 mein A1 aur A2 kya hain?", o:["Cell references","Formulas","Sheet ke naam","Functions"], a:0}
],
powerpoint: [
 {q:"PowerPoint mein NAYI SLIDE ki shortcut?", o:["Ctrl+M","Ctrl+N","Ctrl+S","Alt+N"], a:0},
 {q:"Slideshow shuru karne ki key?", o:["F5","F1","F7","F12"], a:0},
 {q:"Sirf CURRENT slide se slideshow chalane ke liye?", o:["Shift+F5","Ctrl+F5","Alt+F5","F5"], a:0},
 {q:"Slide ka design / theme kahan se badalte hain?", o:["Design tab","Home tab","View tab","File tab"], a:0},
 {q:"Text ya tasveer par ANIMATION kahan se lagti hai?", o:["Animations tab","Transitions tab","Design tab","Insert tab"], a:0},
 {q:"Ek slide se dusri slide par jaane ka effect kya kehlata hai?", o:["Transition","Animation","Theme","Layout"], a:0},
 {q:"PowerPoint file ka format kya hota hai?", o:[".pptx",".docx",".xlsx",".pdf"], a:0},
 {q:"Slide mein TEXT BOX kahan se insert hota hai?", o:["Insert tab","Home tab","Draw tab","Review tab"], a:0},
 {q:"Slide DELETE karne ka sahi tareeqa?", o:["Select karke Delete dabao","Ctrl+Z dabao","Double-click karo","File > Close"], a:0},
 {q:"Slide Master kahan se khulta hai?", o:["View tab","Home tab","Design tab","Slide Show tab"], a:0}
],
inpage: [
 {q:"InPage software kis kaam aata hai?", o:["Urdu composing / kitabat","Photo editing","Video banana","Game khelna"], a:0},
 {q:"Urdu ka mashhoor Nastaleeq font kaunsa hai?", o:["Jameel Nastaleeq","Arial","Times New Roman","Calibri"], a:0},
 {q:"InPage mein nayi file ki shortcut?", o:["Ctrl+N","Ctrl+O","Alt+N","F2"], a:0},
 {q:"InPage file ka format kya hota hai?", o:[".inp",".docx",".ind",".pdf"], a:0},
 {q:"InPage mein print ki shortcut?", o:["Ctrl+P","Ctrl+R","Alt+P","F12"], a:0},
 {q:"InPage mein text likhne ke liye kaunsa tool use hota hai?", o:["Text tool","Picture tool","Line tool","Fill tool"], a:0},
 {q:"Urdu likhne ke liye keyboard kaisa hona chahiye?", o:["Urdu / Phonetic keyboard","Sirf English keyboard","Number pad","Mouse"], a:0},
 {q:"InPage mein page ka size kahan se set hota hai?", o:["File / Page setup","Edit menu","View menu","Help menu"], a:0},
 {q:"Tasveer insert karne ke liye kaunsa menu?", o:["Insert menu","File menu","Edit menu","Format menu"], a:0},
 {q:"InPage mein kaam SAVE karne ki shortcut?", o:["Ctrl+S","Ctrl+D","Alt+S","F5"], a:0}
],
basics: [
 {q:"CPU kya hai?", o:["Computer ka dimagh (processor)","Computer ki screen","Keyboard ka hissa","Printer ka part"], a:0},
 {q:"RAM kis kaam aati hai?", o:["Aarzi (temporary) memory","Mustaqil storage","Internet chalana","Print karna"], a:0},
 {q:"Hard disk kis liye hoti hai?", o:["Mustaqil data storage","Aarzi memory","Screen display","Sound"], a:0},
 {q:"Mouse se RIGHT-click karne par kya hota hai?", o:["Menu khulta hai","File delete hoti hai","Computer band ho jata hai","Kuch nahi hota"], a:0},
 {q:"Windows mein Start button kahan hota hai?", o:["Neeche left corner","Upar right corner","Beech mein","Kahin nahi hota"], a:0},
 {q:"Delete ki hui file kahan jaati hai?", o:["Recycle Bin","My Documents","Desktop","Control Panel"], a:0},
 {q:"Internet kholne ke liye kya use hota hai?", o:["Browser (Chrome / Edge)","Notepad","Calculator","Paint"], a:0},
 {q:"Naya FOLDER banane ka sahi tareeqa?", o:["Right-click > New > Folder","Ctrl+Alt+Del","Double-click","F1 dabao"], a:0},
 {q:"Computer on karne par sab se pehle kaunsi screen aati hai?", o:["Desktop","BIOS","Notepad","Calculator"], a:0},
 {q:"Email bhejne ke liye mashhoor service kaunsi hai?", o:["Gmail","MS Paint","VLC Player","WinRAR"], a:0}
]
};
window.TEST_META = {
 word:      {name:"MS Word", icon:"\uD83D\uDCDD", ur:"\u0645\u0627\u0626\u06cc\u06A9\u0631\u0648\u0633\u0627\u0641\u0679 \u0648\u0631\u0688", mcq:true, practical:"word"},
 excel:     {name:"MS Excel", icon:"\uD83D\uDCCA", ur:"\u0645\u0627\u0626\u06cc\u06A9\u0631\u0648\u0633\u0627\u0641\u0679 \u0627\u06CC\u06A9\u0633\u0644", mcq:true, practical:"excel"},
 powerpoint:{name:"PowerPoint", icon:"\uD83D\uDCC5", ur:"\u067E\u0627\u0648\u0631 \u067E\u0648\u0627\u0626\u0646\u0679", mcq:true, practical:"ppt"},
 inpage:    {name:"InPage (Urdu)", icon:"\uD83D\uDCF0", ur:"\u0627\u0646 \u067E\u06CC\u062C \u0627\u0631\u062F\u0648", mcq:true, practical:"typing-ur"},
 typing:    {name:"Typing Test", icon:"\u2328\uFE0F", ur:"\u0679\u0627\u0626\u067E\u0646\u06AF \u0679\u06CC\u0633\u0679", mcq:false, practical:"typing-en"},
 basics:    {name:"Computer Basics", icon:"\uD83D\uDCBB", ur:"\u0628\u0646\u06CC\u0627\u062F\u06CC \u06A9\u0645\u067E\u06CC\u0648\u0679\u0631", mcq:true, practical:null}
};

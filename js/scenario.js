/*
const scenario = [
  ['SERIF', '吾輩は猫である'],
  ['BGM',   'bgm_peaceful.mp3'],
  ['SERIF', '名前は%name%だ'],
  ['BG',    'beach_001.jpg'],
  ['SERIF', 'どこで生まれたかとんと見当がつかぬ']
];
*/

let scenario = [
  ['SERIF', '吾輩は猫である。名前はまだ無い。', 'VC01_00001.mp3'],
  ['BGM',   'bgm_peaceful.mp3', 'skip'],
  ['CHARA', [2, '9.png'], 'skip'],
  ['CHARA', [3, '10.png'], 'skip'],
  ['SERIF', 'どこで生れたかとんと見当がつかぬ。', 'VC01_00002.mp3'],
  ['CHOICE',  {
                'title':'どこで生まれましたか？',
                'choices': [
                  {text:'島根県', next:'part2'},  // part2へ移動
                  {text:'馬小屋', next:'part3'},  // part3へ移動
                  {text:'桃',     next:null}      // ↓へ続行
                ]
              }
  ],
  ['SERIF', '何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。', 'VC01_00003.mp3'],
  ['SERIF', '吾輩はここで始めて人間というものを見た。', 'VC01_00004.mp3'],
  ['SERIF', 'しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。', 'VC01_00005.mp3'],
  ['SERIF', 'この書生というのは時々我々を捕つかまえて煮て食うという話である。',  'VC01_00006.mp3'],
  ['SERIF', 'しかし実際にそんな事をするときがあるかというと今更ながらに疑問である。', 'VC01_00007.mp3'],
  ['SERIF', 'ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。', 'VC01_00008.mp3'],
  ['CHARA', [2, 'blank.png'], 'skip'],
  ['CHARA', [3, 'blank.png'], 'skip'],
  ['NEXT',  'part2']
];
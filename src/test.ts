import axios from 'axios';
import { generate as generateQuestion } from './generate.js';

generateQuestion([
    "競馬で1枠の騎手の帽子の色は白ですが、2枠の騎手の帽子の色は何でしょう?",
    "L字型、キャッシング型、マレット型などの種類がある、ゴルフで特にグリーン周りで使うクラブを何というでしょう?",
    "三角形の二辺の中点を結んだ線分は、残りの一辺と平行かつ残りの辺の長さの半分の長さになることを何というでしょう?",
    "「ここに地終わり、海始まる」と書かれた石碑でもおなじみの、ポルトガルにあるヨーロッパ最西端の岬とは何岬でしょう?"
]).then(res => console.log(res));
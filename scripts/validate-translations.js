#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const i18nConfigPath = path.join(__dirname, '..', 'i18n.config.js');
// 闂傚倷绀侀幉锟犲蓟閿濆绀夌€广儱顦悞鍨亜閹寸偛顕滅紒浣哄閵囧嫰寮村顒€绁悗瑙勬穿缂嶄礁顕ｆ禒瀣垫晣婵犙勫劤娴滃墽鈧箍鍎遍ˇ浼村磿?i18n 闂傚倸鍊烽悞锕€顭垮Ο鑲╃煋闁割偅娲橀崑顏堟煕閳╁啰鈯曢柡鍜佸墴閹﹢鎮欑捄杞版睏缂備胶濮崇划娆撳蓟閻斿吋鈷愰柟閭﹀幘閵堜即姊洪崨濠冨碍闁靛牏顭堥锝夋偨閸撳弶鏅為柣鐘充航閸斿酣骞夐崸妤佲拺闁告稑锕﹂幊鍕亜閵娿儲顥㈢€殿噮鍋婇、姘跺焵椤掑嫮宓侀柟閭﹀幗婵绱掑☉姗嗗剰婵炲爜鍥ㄧ厽闁绘棃顥撳▓閬嶆煕鐎ｎ偅宕岄柡灞剧☉椤繈顢楁担瑙勫婵?
const i18nConfig = fs.existsSync(i18nConfigPath) ? require(i18nConfigPath) : null;
const SUPPORTED_LOCALES =
  (i18nConfig &&
    i18nConfig.locales &&
    Array.isArray(i18nConfig.locales.supported) &&
    i18nConfig.locales.supported.length > 0
      ? i18nConfig.locales.supported
      : ['en']).map((locale) => locale.trim());

/**
 * 缂傚倸鍊搁崐鎼佹偋婵犲伣锝夊箳濡や礁鍓ㄩ悷婊勬瀵濡搁埡濠冩櫔闂侀€炲苯澧撮柟顔芥緲閳诲酣骞嬮悙鑼酱濠电偠鎻紞鈧俊顐㈠缁旂喖寮介鐔哄幐? * 濠电姷顣藉Σ鍛村磻閳ь剟鏌涚€ｎ偅宕岄柡宀嬬磿娴狅妇鎷犻幓鎺戭潚闂備礁鎽滈崕鎰板礈閻旂厧绠氱€广儱妫欐刊鎾煟閵堝骸鐏犳鐐╁亾婵犵數鍋犻幓顏嗙礊閳ь剚绻涙径瀣鐎殿噮鍋婃俊鑸靛緞鐎ｎ亜澹勯梻浣告啞濞诧箓宕㈡ィ鍐ㄧ９闁规儼濮ら崑锝夋煕閵夛絽濡奸柣蹇旀尦閺屸剝绗熼崶褍绫嶉悗娈垮枙閸楁娊銆佸☉姗嗘僵妞ゆ挾鍋涙晶楣冩⒒娓氣偓濞艰崵鎷归悢鐓庣閹兼番鍔嶉崐鐑芥煛閸モ晛校閻庢碍宀搁弻鐔衡偓鐢殿焾娴狅箓鏌ｆ惔顔兼灈闂囧鏌ｅΟ鎸庣彧闁哄瀚伴弻銈夊垂椤愩垻浠奸梺閫炲苯澧紒瀣浮閺佸鈹戦悩顐壕?
 */

// 闂傚倸鍊烽悞锕€顭垮Ο鑲╃煋闁割偅娲橀崑?
const CONFIG = {
  localesDir: 'public/locales',
  sourceGlob: '{pages,components,lib}/**/*.{ts,tsx}',
  supportedLocales: SUPPORTED_LOCALES,
  excludePatterns: [
    'node_modules/**',
    '.next/**',
    '**/*.test.*',
    '**/*.spec.*'
  ]
};

// 婵犵妲呴崑鍡樻櫠濡ゅ啫鍨濋煫鍥ㄦ⒒閻濊泛鈹戦悩鎻掓殲缂傚秴娲弻鐔煎箚瑜嶉弳杈ㄦ叏?
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 闂傚倷绀侀幉鈥愁潖缂佹ɑ鍙忛柟顖ｇ亹瑜版帒鐐婇柍鍝勫暟椤︹晠姊洪崫鍕仼缂佺粯甯掑嵄妞ゆ牜鍋為悡娑㈡煕鐏炲墽顣查柣顓燁殕缁?
 */
function loadTranslations(locale) {
  const translations = {};
  const localeDir = path.join(CONFIG.localesDir, locale);
  
  if (!fs.existsSync(localeDir)) {
    return translations;
  }
  
  const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(localeDir, file), 'utf8'));
      const namespace = path.basename(file, '.json');
      
      if (namespace === 'common') {
        // common.json 闂傚倷鐒﹂惇褰掑礉瀹€鈧埀顒佸嚬閸撶喎鐣烽鍌楀亾閻㈢數銆婇柛瀣崌閹兘鎮ч崼锝囶攨婵犵數鍋炶ぐ鍐焽閿熺姷宓侀柟鐑橆殔鍞梺闈涱檧缁犳垿鍩€椤戞儳鈧牠銆冮妷鈺傚€烽柤鍝ユ暩閵嗘劙姊虹化鏇熸珔闁活厼鍊搁锝嗙鐎ｎ亝宓嶅銈嗘尪閸ㄨ鐣峰鍫熲拺?
        Object.assign(translations, content);
      } else {
        // 闂傚倷鑳堕…鍫㈡崲閹存繐鑰块柛锔诲幖閸ㄦ繃銇勯幒鎴濐仼婵☆偅锕㈤弻娑㈠Ψ椤栫偞顎嶅銈嗗姌濡嫰婀侀梺鎸庣箓濡盯鎯岄崱娑欏仯闁归偊鍠栭弸娑氣偓瑙勬磸閸旀垿骞愭繝鍐ㄧ窞閻庯綆浜栭崑鎾崇暦閸モ晝锛滈柣蹇曞仧閸嬫捇濡靛┑鍥︾箚?
        translations[namespace] = content;
      }
    } catch (error) {
      log('red', `闂?Error loading ${file}: ${error.message}`);
    }
  }
  
  return translations;
}

/**
 * 闂傚倷绀侀崥瀣磿閹惰棄搴婇柤鑹扮堪娴滃綊鏌涢妷鎴濇噺濞堝ジ鏌ｈ箛鏇炰户闁烩剝鏌ㄩ埢鎾村鐎涙ê鈧敻鏌ｉ姀鈽嗗晱闁衡偓娴煎瓨鐓㈤柡宓喚浼冮梺璇″灠閸熸潙鐣烽悢纰辨晝闁绘棁娓规竟? */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * 闂傚倷绀侀崥瀣磿閹惰棄搴婇柤鑹扮堪娴滃綊鏌涢妷銏℃澒闁稿鎹囬幃钘夆枔閹稿孩鏆為梻浣藉Г閻楁洜鈧矮鍗抽獮鍡涘礃椤旇偐顦板銈嗗坊閸嬫挻銇勯敐鍡欏弨闁哄矉绻濆畷鐓庘攽閹邦厸鏋呴梻浣芥〃缁讹繝宕㈡ィ鍐ㄧ闁告洦鍨奸弫宥嗘叏濡じ鍚柣?
 */
function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * 婵犵數鍋涢顓熸叏鐎电硶鍋撳☉鎺撴珖闁兼椽浜堕、娆撴偩瀹€濠冪カ闂備焦瀵х换鍌毭洪妸鈺佸瀭闁告劖绁村Σ鍫ユ煙閸喖鏆欐鐐搭殘閹插憡锛愭担铏圭崲閻庤娲╃紞浣割嚕娴犲鏁冮柕鍫濇噳閸嬫捇骞庨懞銉ヤ化闂佹悶鍎崝宀勬倶閹绢喗鐓涘〒姘搐楠炴鏌熷畡鐗堝櫧闁圭懓瀚版俊鎼佹晜閼恒儺鍚?
 */
function extractTranslationUsage() {
  const usage = [];
  const files = glob.sync(CONFIG.sourceGlob, { ignore: CONFIG.excludePatterns });

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // 闂傚倷绀侀幖顐⒚洪妶澶樻晪妞ゆ挾濮炬慨鎶芥偣閹帒濡介柛蹇旂矋閵囧嫰寮崒姘闂佷紮缍佹禍鍫曞箖瀹勬壋鏋庢繛鍡樺灩钃遍梻浣筋嚙缁ㄨ偐鍒掑▎鎾虫瀬鐎广儱鎷嬪鈺傘亜閹捐泛鍓辨俊顐ゅ枛濮婃椽宕ㄦ繝鍌滎儌婵犫拃鍕垫疁闁诡垯绶氶崺鍕礃椤忎焦鐏?useTranslations 闂備浇宕垫慨鎾敄閸涙潙鐤ù鍏兼綑閺嬩線鏌曢崼婵愭Ц闁活厽顨呴埞鎴︽偐閹绘巻鍋撶粙娆惧殫闁瑰墽绮崐鐢告煟閵忕姷浠涢柛銈傚亾缂傚倷闄嶉崝宥夋偂閿熺姴绠氶柛鎰靛枛缁€瀣亜閹扳晛鐏紒澶樺櫍濮婄粯鎷呴悷鎵シ缂備胶绮崝娆撶嵁?
    const useTranslationsMatches = [];
    const useTranslationsRegex = /const\s+(\w+)\s*=\s*useTranslations\(\s*(?:['"`]([^'"`]*?)['"`])?\s*\)/g;
    let match;

    while ((match = useTranslationsRegex.exec(content)) !== null) {
      const varName = match[1];
      const namespace = match[2] || null;
      useTranslationsMatches.push({ varName, namespace });
    }

    // 婵犵數鍋為崹鍫曞箰妤ｅ啫纾块柕鍫濐槹閸庡﹪鏌嶉埡浣告殶闁崇粯姊归妵鍕疀閹炬惌妫ら梺绋匡攻婵炲﹪骞冭ぐ鎺戠倞闁靛鍎虫禒鎾偡濠婂嫭绶叉い锔炬暬瀵鐣濋崘顏嗘澑闂佸搫鍟崐绋款嚕閵娾晜鈷戦柣鐔稿娴犳盯鏌涙惔銏犫枙鐎规洩缍佸畷婊嗩槼閻庢凹鍓熼弻娑㈠箛閸忓摜鍑归梺?
    for (const { varName, namespace } of useTranslationsMatches) {
      const tCallRegex = new RegExp(`\\b${varName}\\(\\s*['"\`]([^'"\`]*?)['"\`]`, 'g');
      let tMatch;

      while ((tMatch = tCallRegex.exec(content)) !== null) {
        const key = tMatch[1];
        const tLineNumber = content.substring(0, tMatch.index).split('\n').length;
        const fullKey = namespace ? `${namespace}.${key}` : key;

        usage.push({
          file,
          line: tLineNumber,
          key: fullKey,
          namespace,
          originalKey: key,
          varName
        });

        // 婵犵數濮烽。浠嬪焵椤掆偓閸熷潡鍩€椤掆偓缂嶅﹪骞冨Ο璇茬窞闁归偊鍘鹃崣鍡楊渻閵堝棙鈷掗柛妯犲洦鍎婇柛顐ｆ礃閻撴洘鎱ㄥΟ鐓庡付濞存粍绻堥弻锟犲幢濞嗗繑鐏佺紓浣介哺鐢€崇暦閻旂⒈鏁囬柣鎰紦閹查箖鏌ｆ惔銏╁晱闁哥姵顨呯叅闁冲搫鍟～鏇熺箾閸℃ê濮冪紒?purposes.0闂傚倷鐒︾€笛呯矙閹次层劑鍩€椤掑倻纾奸弶鍫涘妿缁犳牜绱掔€ｎ亷韬柟顔哄灲瀹曨偊濡烽妷褌绱橀梻浣藉吹婵娊鎮為敂鐣岀彾闁糕剝绋戦弰銉︿繆閵堝懏鍣归柡瀣╃窔閺岀喎鈻撻崹顔界亾闂佹椿鍘奸鍛村煡婢舵劕绠婚柧蹇ｅ亝閸庢捇姊洪崨濠傜亶闁告挻绻堥獮蹇涘川椤栨稑纾梺闈涱煭闂勫嫬鈻?
        if (key.match(/\.\d+$/)) {
          const parentKey = key.replace(/\.\d+$/, '');
          const parentFullKey = namespace ? `${namespace}.${parentKey}` : parentKey;
          usage.push({
            file,
            line: tLineNumber,
            key: parentFullKey,
            namespace,
            originalKey: parentKey,
            varName,
            isArrayParent: true
          });
        }
      }
    }

    // 婵犵數鍋為崹璺侯潖婵犳艾绐楅幖杈剧导閻掑﹥銇勯弴妤€浜鹃梺鍝勮嫰閿曘倝顢樻總绋跨倞闁靛ě鍐ㄦ瘣闂傚倷娴囬～澶嬬娴犲纾块柛鎰ゴ閺嬫棃鏌熺€电啸缂佲偓閸曨垱鐓涢柛鏇ㄥ亞缁犺櫕淇婂顔肩仸婵﹤鎼埢搴ㄥ箚瑜庨悘鍡樼節閻㈤潧浠滄繛宸弮楠炲啯绂掔€Ｑ€鍋撻敃鍌氱闁哄啫鍋嗗Σ杈ㄧ節閻㈤潧浠滃璺烘喘瀹曟粌鈹戦崱顓♀偓鍨€掑锝呬壕閻庤娲忛崝鎴﹀箰婵犲啫绶為悗锝庝簴閸嬫挸鐣烽崶鈺冿紲闁诲繒鍋熼崑鎾诲Φ濠靛洣绻嗘い鎰╁灪閸嬨儵鏌熼姘殻鐎规洜鍠栭、妤呭焵椤掑嫬绀堝ù鐓庣摠閻撴洟鏌熼柇锕€娅橀柡鍡樼矌缁?
    const directCallRegex = /useTranslations\(\)\s*\(\s*['"`]([^'"`]*?)['"`]/g;
    while ((match = directCallRegex.exec(content)) !== null) {
      const key = match[1];
      const lineNumber = content.substring(0, match.index).split('\n').length;

      usage.push({
        file,
        line: lineNumber,
        key,
        namespace: null,
        originalKey: key,
        varName: 't'
      });
    }
  }

  return usage;
}

/**
 * 婵犲痉鏉库偓妤佹叏閹绢喗鍎楀〒姘ｅ亾闁诡垯鐒﹀鍕暆閳ь剛绮堥崟顖涚厸闁告洦鍋嗙粻铏繆瀹割喖鐏︽慨? */
function validateTranslations() {
  log('blue', '濠碘槅鍋撶徊浠嬪疮椤栫偛鏋?Starting translation validation...\n');
  
  const results = {
    totalKeys: 0,
    missingKeys: [],
    unusedKeys: [],
    validKeys: 0
  };
  
  // 闂傚倷绀侀幉鈥愁潖缂佹ɑ鍙忛柟顖ｇ亹瑜版帒鐐婇柍鍝勫暟椤︹晠姊洪崫鍕仼缂佺粯甯掑嵄?
  const translations = {};
  for (const locale of CONFIG.supportedLocales) {
    translations[locale] = loadTranslations(locale);
  }
  
  // 闂傚倷绀佸﹢杈╁垝椤栫偛绀夐柡鍤堕姹楅梺鎼炲劘閸斿秵鍒婇幘顔藉仯闁诡厽甯掓俊浠嬫煛閸℃绠婚柡宀€鍠栭、娑橆潩椤撶偞顏犻梻?
  const usage = extractTranslationUsage();
  results.totalKeys = usage.length;
  
  log('blue', `濠碘槅鍋撶徊浠嬪疮椤栫偛绠?Found ${usage.length} translation key usages`);
  log('blue', `濠碘槅鍋撶徊浠嬪疮椤愶富鏁?Checking ${CONFIG.supportedLocales.length} locale(s): ${CONFIG.supportedLocales.join(', ')}\n`);
  
  // 婵犵妲呴崑鈧柛瀣崌閺岋紕浠︾拠鎻掑Б閻庤鐡曟ご绋款嚗閸曨剚缍囬柍鍝勫€婚弳鐘绘⒒?
  for (const item of usage) {
    let found = false;
    
    for (const locale of CONFIG.supportedLocales) {
      const value = getNestedValue(translations[locale], item.key);
      if (value !== undefined) {
        found = true;
        break;
      }
    }
    
    if (found) {
      results.validKeys++;
    } else {
      results.missingKeys.push(item);
    }
  }
  
  // 濠电姷顣藉Σ鍛村磻閳ь剟鏌涚€ｎ偅宕岄柡宀嬬磿娴狅妇鎷犻幓鎺戭潥婵犵數濮崑鎾淬亜閹捐泛鏋戝┑顖涙尦閹綊骞侀幒鎴濐瀴闂佸搫妫楃换姗€寮婚敐澶娢╅柕澶堝労娴煎啴姊?
  const usedKeys = new Set(usage.map(u => u.key));
  for (const locale of CONFIG.supportedLocales) {
    const allKeys = getAllKeys(translations[locale]);
    for (const key of allKeys) {
      if (!usedKeys.has(key)) {
        results.unusedKeys.push({ locale, key });
      }
    }
  }
  
  return results;
}

/**
 * 闂傚倷鐒﹂惇褰掑垂婵犳艾绐楅柟鐗堟緲閸ㄥ倹鎱ㄥΟ鎸庣【缂佺媭鍣ｉ弻鏇熷緞閸繂濮曢梺?
 */
function generateReport(results) {
  log('bold', '濠碘槅鍋撶徊浠嬪疮椤栫偛绠?Translation Validation Report');
  log('bold', '================================\n');
  
  // 闂傚倷娴囬鏍礈濮橆儵锝夊箳濡ゅ绋?
  log('green', `闂?Valid Keys: ${results.validKeys}`);
  log('red', `闂?Missing Keys: ${results.missingKeys.length}`);
  log('yellow', `闂傚倷绀侀悿鍥р枖閺囩喎鍨旈悗闈涙憸缁? Unused Keys: ${results.unusedKeys.length}`);
  log('blue', `濠碘槅鍋撶徊浠嬪疮椤栫偛绠?Total Checked: ${results.totalKeys}\n`);
  
  // 缂傚倸鍊搁崐鎼佸磹閹间礁绠规い鎰剁畱妗呴梺纭呮彧闂勫嫰宕曞澶嬬厱闁哄洢鍔岄悘锟犳煛?
  if (results.missingKeys.length > 0) {
    log('red', '闂?Missing Keys:');
    log('red', '================');
    for (const item of results.missingKeys) {
      log('red', `  - ${item.key}`);
      log('red', `    Used in: ${item.file}:${item.line}`);
    }
    console.log();
  }
  
  // 闂備礁鎼悧婊勭濞嗘劗绠鹃柛銉墯閸嬨劑鏌曟繛褍瀚弳鐘绘⒒?
  if (results.unusedKeys.length > 0) {
    log('yellow', '闂傚倷绀侀悿鍥р枖閺囩喎鍨旈悗闈涙憸缁? Unused Keys:');
    log('yellow', '================');
    const groupedByLocale = results.unusedKeys.reduce((acc, item) => {
      if (!acc[item.locale]) acc[item.locale] = [];
      acc[item.locale].push(item.key);
      return acc;
    }, {});
    
    for (const [locale, keys] of Object.entries(groupedByLocale)) {
      log('yellow', `  ${locale}:`);
      for (const key of keys.slice(0, 10)) { // 闂傚倷绀侀幉锟犳偡椤栨稓顩叉繝闈涙焾閻旂绶炵€光偓閳ь剟鎯岄崱娑欑厱婵犻潧妫楅鈺傘亜?0婵?        log('yellow', `    - ${key}`);
      }
      if (keys.length > 10) {
        log('yellow', `    ... and ${keys.length - 10} more`);
      }
    }
    console.log();
  }
  
  // 闂備浇宕甸崰鎰洪弽顬稑鈽夊Ο蹇曞劋缁绘繈宕堕妸銉よ檸?
  const coverage = results.totalKeys > 0 ? 
    ((results.validKeys / results.totalKeys) * 100).toFixed(1) : '100.0';
  log('blue', `濠碘槅鍋撶徊浠嬪疮椤栫偛绠?Translation Coverage: ${coverage}%`);
  
  return results.missingKeys.length === 0;
}

/**
 * 婵犵數鍋為崹鍫曞箲娓氣偓椤㈡俺顦圭€规洜鏁婚弻鍡楊吋閸涱喚鈧? */
function main() {
  try {
    const results = validateTranslations();
    const success = generateReport(results);
    
    if (success) {
      log('green', '\n濠碘槅鍋撶徊浠嬪疮椤愩倗鍗?All translation keys are valid!');
      process.exit(0);
    } else {
      log('red', '\n濠碘槅鍋撶徊浠嬪疮椤栨壕鍋?Translation validation failed!');
      process.exit(1);
    }
  } catch (error) {
    log('red', `濠碘槅鍋撶徊浠嬪疮椤栨壕鍋?Error during validation: ${error.message}`);
    process.exit(1);
  }
}

// 闂備礁鎼ˇ顐﹀疾濠婂牆绀夋慨妞诲亾闁靛棔绶氶獮瀣晜閽樺鐣绘繝娈垮枟閿曗晠宕㈡禒瀣?
if (require.main === module) {
  main();
}

module.exports = { validateTranslations, loadTranslations };

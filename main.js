
// 游戏状态管理
const gameState = {
    currentCity: null,
    health: 50,
    mood: 50,
    inventory: ['龙井茶叶'],
    visitedCities: [],
    gameStarted: false,
    teaLeavesCollected: 0,
    // 剧情相关状态
    helpedCaravan: false,
    boughtFood: false,
    gotCamel: false,
    rejectedHuJi: false,
    visitedLongwu: true,
    visitedLuoyang: false,
    visitedXian: false,
    visitedLanzhou: false,
    visitedDunhuang: false,
    visitedTurpan: false,
    visitedKashgar: false,
    visitedYili: false,
    visitedWlmq: false,
    // 新功能状态
    longwuPathChosen: null, // 'tea-mountain' 或 'tea-shop'
    wlmqCompleted: { bazaar: false, teahouse: false, butterTea: false }, // 乌鲁木齐各地点完成状态
    // 新疆茶馆介绍图片查看状态
    xinjiangTeahouseImagesViewed: {
        cake: false,
        cookie: false,
        milk_tea: false,
        roast_mutton: false,
        tea: false
    },
    // 乌鲁木齐茶馆介绍图片查看状态
    wlmqTeahouseImagesViewed: {
        toy1: false,
        toy2: false,
        toy3: false
    },
    freeExploration: false, // 自由探索模式
    storyCompleted: false // 主线剧情完成
};

// 新增：游戏模式管理

let storyProgress = 0; // 剧情进度索引
const storyOrder = ['longwu', 'luoyang', 'xian', 'lanzhou', 'jiayuguan', 'dunhuang', 'wulumuqi'];

// NPC形象配置 - 使用新的无背景剪影
const npcImages = {
    tea_merchant: 'npc/npc_tea_merchant_new.png',
    villager: 'npc/npc_villager_new.png',
    innkeeper: 'npc/npc_innkeeper_new.png',
    traveler: 'npc/npc_traveler_new.png',
    hu_merchant: 'npc/npc_hu_merchant_new.png',
    elder: 'npc/npc_elder_new.png',
    teahouse_owner: 'npc/npc_teahouse_owner_new.png',
    hu_girl: 'npc/npc_hu_girl_new.png',
    camel_passenger: 'npc/npc_camel_passenger_new.png',
    peddler: 'npc/npc_peddler_new.png',
    hu_merchant: 'npc/npc_hu_merchant_new.png',
    none: '' // 无NPC形象
};

// 城市数据
const cityData = {
    longwu: {
        name: '龙坞',
        description: '龙坞是龙井茶的重要产地，这里山清水秀，茶香四溢。',
        history: '龙坞茶镇位于杭州西湖区，是龙井茶的核心产区之一。这里有着悠久的茶文化历史，古代茶商从这里出发，沿着丝绸之路将茶叶运往西域。',
        minigame: 'teaPicking',
        position: { top: 70, left: 15 }
    },
    luoyang: {
        name: '洛阳',
        description: '古都洛阳，是丝绸之路的重要节点，茶文化在这里繁荣发展。',
        history: '洛阳作为十三朝古都，是古代重要的茶叶集散地。唐代时，洛阳的茶文化达到鼎盛，许多文人墨客在此品茶论道。',
        minigame: 'teaQuiz',
        position: { top: 65, left: 25 }
    },
    xian: {
        name: '西安',
        description: '古都西安，丝绸之路的起点，茶文化的发源地之一。',
        history: '西安作为古代长安，是丝绸之路的东方起点。唐朝时期，茶文化在这里蓬勃发展，陆羽的《茶经》就在此完成。',
        minigame: 'teaTasting',
        position: { top: 60, left: 35 }
    },
    lanzhou: {
        name: '兰州',
        description: '黄河之都兰州，是茶马古道的重要驿站。',
        history: '兰州地处黄河上游，是古代茶马互市的重要场所。这里的牛肉面和茶文化完美结合，形成了独特的饮食文化。',
        minigame: 'culturalShopping',
        position: { top: 55, left: 45 }
    },
    jiayuguan: {
        name: '嘉峪关',
        description: '天下第一雄关，丝绸之路的重要关隘。',
        history: '嘉峪关是明代长城的西端起点，古代商旅必须在此通关才能继续西行。这里见证了无数茶商的艰辛历程。',
        minigame: 'fortressChallenge',
        position: { top: 50, left: 55 }
    },
    dunhuang: {
        name: '敦煌',
        description: '丝路明珠敦煌，莫高窟的壁画见证着茶文化的传播。',
        history: '敦煌是丝绸的咽喉要道，莫高窟的壁画中有着丰富的茶文化元素。这里见证了东西方文化的交融。',
        minigame: 'muralAppreciation',
        position: { top: 45, left: 65 }
    },
    turpan: {
        name: '吐鲁番',
        description: '火焰山下的绿洲，葡萄沟的甜美让人流连忘返。',
        history: '吐鲁番是丝绸之路上的重要驿站，这里的葡萄干和哈密瓜闻名天下。茶文化在这里与维吾尔族文化完美融合。',
        minigame: 'teaQuiz',
        position: { top: 40, left: 70 }
    },
    kashgar: {
        name: '喀什',
        description: '西域明珠喀什，艾提尕尔清真寺的钟声悠扬。',
        history: '喀什是古代西域的重要城市，这里的香料市场和手工艺品闻名遐迩。茶文化在这里与中亚文化相互交融。',
        minigame: 'culturalShopping',
        position: { top: 35, left: 75 }
    },
    yili: {
        name: '伊犁',
        description: '塞外江南伊犁，草原上的奶茶香飘万里。',
        history: '伊犁是新疆的牧业基地，这里的草原风光和哈萨克族文化极具特色。奶茶文化在这里源远流长。',
        minigame: 'teaTasting',
        position: { top: 30, left: 75 }
    },
    wulumuqi: {
        name: '乌鲁木齐',
        description: '丝路终点乌鲁木齐，酥油奶茶的香醇等待着你。',
        history: '乌鲁木齐是丝绸的北道终点，这里融合了汉、维、哈等多民族文化。酥油奶茶成为这里最具特色的饮品。',
        minigame: 'butterTea',
        position: { top: 40, left: 80 }
    }
};

// 初始化游戏
function initGame() {
    updateStatusBars();

    // 显示开始对话框
    showDialog('欢迎来到丝路茶商', '你是龙坞茶镇土生土长的人，你从出生起便与龙井结下了不解之缘。在你二十多岁那年，你的同乡自洛阳卖茶归来...', [
        { text: '开始旅程', action: startGame, class: 'primary' }
    ], 'tea_merchant');
}

function toggleGameMode() {
    if (gameState.freeExploration) {
        gameState.freeExploration = false;

        // 重置乌鲁木齐状态，允许再次进入剧情模式
        gameState.visitedWlmq = false;
        gameState.wlmqCompleted = {
            bazaar: false,
            teahouse: false,
            butterTea: false,
            bazaarStory: false,
            teahouseStory: false
        };

        document.getElementById('mode-toggle-btn').textContent = '退出自由探索模式';
        document.getElementById('current-mode-display').textContent = '当前模式：自由探索模式';
        showToast('已进入剧情模式，请按顺序推进剧情');
    } else {
        gameState.freeExploration = true;
        document.getElementById('mode-toggle-btn').textContent = '进入自由探索模式';
        document.getElementById('current-mode-display').textContent = '当前模式：剧情探索';
        showToast('已进入自由探索模式');

    }
    updateModeDisplay();
    updateCityLocks();
}

// 新增：更新模式显示
function updateModeDisplay() {
    const modeBtn = document.getElementById('mode-toggle-btn');
    const modeDisplay = document.getElementById('current-mode-display');

    if (gameState.freeExploration) {
        modeBtn.textContent = '退出自由探索模式';
        modeBtn.style.background = '#e74c3c';
        modeDisplay.textContent = '当前模式：自由探索模式';
    } else {
        modeBtn.textContent = '进入自由探索模式';
        modeBtn.style.background = 'var(--primary-green)';
        modeDisplay.textContent = '当前模式：剧情模式';
    }
}

// 开始游戏
function startGame() {
    gameState.gameStarted = true;
    gameState.currentCity = 'longwu';

    // 显示角色在龙坞位置
    const character = document.getElementById('character');
    const longwuNode = document.getElementById('longwu');
    const rect = longwuNode.getBoundingClientRect();

    character.style.left = rect.left + rect.width / 2 - 20 + 'px';
    character.style.top = rect.top + rect.height / 2 - 20 + 'px';
    character.style.display = 'block';

    closeDialog();

    // 激活当前城市
    longwuNode.classList.add('active');

    // 开始龙坞剧情
    setTimeout(() => {
        storyLongwu();
    }, 500);
}

// 城市节点点击处理
document.querySelectorAll('.city-node').forEach(node => {
    node.addEventListener('click', function () {
        if (!gameState.gameStarted) return;

        const cityId = this.id;

        // 龙坞剧情未完成时，不能点击其他城市
        if (!gameState.visitedLongwu && cityId !== 'longwu') {
            showToast('请先完成龙坞的约定。');
            return;
        }

        if (gameState.currentCity === cityId) {
            // 当前城市，显示剧情选项
            if (cityId === 'longwu' && gameState.storyCompleted) {
                // 番外入口
                showExtraStory();
            } else {
                triggerCityStory(cityId);
            }
        } else if (canTravelTo(cityId)) {
            // 可以前往的城市
            travelToCity(cityId);
        } else {
            // 不能前往的城市
            if (gameState.freeExploration) {
                // 自由探索模式下可以访问任意城市
                travelToCity(cityId);
                // 触发知识问答/知识卡片
                setTimeout(() => {
                    showKnowledgeCard(cityId);
                }, 1000);
            } else {
                showToast('丝绸之路需循序渐进。');
            }
        }
    });
});

// 显示Toast提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 显示知识卡片
function showKnowledgeCard(cityId) {
    const city = cityData[cityId];
    showDialog(city.name + ' - 知识卡片',
        `<p><strong>简介：</strong>${city.description}</p>
                <p><strong>历史：</strong>${city.history}</p>
                <p>这是一座充满历史韵味的城市，见证了丝绸之路的繁荣。</p>`, [
        { text: '了解了', action: closeDialog, class: 'primary' }
    ], 'tea_merchant');
}

// 触发城市剧情
function triggerCityStory(cityId) {
    switch (cityId) {
        case 'longwu':
            if (!gameState.visitedLongwu && !gameState.freeExploration) {
                gameState.visitedLongwu = true;
                storyLongwu();
            } else if (gameState.longwuPathChosen && !gameState.freeExploration) {
                // 龙坞小地图模式
                showLongwuMiniMap();
            }
            else if (gameState.freeExploration) {
                // 自由探索模式下，提供选择进入小游戏或茶馆
                showDialog('龙坞 - 自由探索', '你来到了熟悉的龙坞茶镇，想要做些什么？', [
                    { text: '采茶小游戏', action: startTeaPickingGame, class: 'primary' },
                    { text: '参观新疆茶馆', action: showXinjiangTeahouseImages, class: 'secondary' }
                ], 'tea_merchant');
            }
            break;
        case 'luoyang':
            if (!gameState.visitedLuoyang && !gameState.freeExploration) {
                gameState.visitedLuoyang = true;
                storyLuoyang();
            }
            else if (gameState.freeExploration)
                startTeaQuiz();
            break;
        case 'xian':
            if (!gameState.visitedXian && !gameState.freeExploration) {
                gameState.visitedXian = true;
                storyXian();
            }
            else if (gameState.freeExploration)
                startTeaTasting('xian');
            break;
        case 'lanzhou':
            if (!gameState.visitedLanzhou && !gameState.freeExploration) {
                gameState.visitedLanzhou = true;
                storyLanzhou();
            }
            else if (gameState.freeExploration)
                startCulturalShopping();
            break;
        case 'jiayuguan':
            if (!gameState.visitedJiayuguan && !gameState.freeExploration) {
                gameState.visitedJiayuguan = true;
                storyJiayuguan();
            }
            else if (gameState.freeExploration)
                startFortressChallenge();
            break;
        case 'dunhuang':
            if (!gameState.visitedDunhuang && !gameState.freeExploration) {
                gameState.visitedDunhuang = true;
                storyDunhuang();
            }
            else if (gameState.freeExploration)
                startMuralAppreciation();
            break;
        case 'turpan':
            if (!gameState.visitedTurpan && !gameState.freeExploration) {
                gameState.visitedTurpan = true;
                storyTurpan();
            }
            break;
        case 'kashgar':
            if (!gameState.visitedKashgar && !gameState.freeExploration) {
                gameState.visitedKashgar = true;
                storyKashgar();
            }
            break;
        case 'yili':
            if (!gameState.visitedYili && !gameState.freeExploration) {
                gameState.visitedYili = true;
                storyYili();
            }
            break;
        case 'wulumuqi':
            if (!gameState.freeExploration) {
                // 剧情模式下，无论是否访问过都显示小地图
                showWlmqMiniMap();
            } else {
                // 自由探索模式下，提供选择进入小游戏或茶馆
                showDialog('乌鲁木齐 - 自由探索', '你来到了乌鲁木齐，想要做些什么？', [
                    { text: '酥油茶小游戏', action: startButterTeaGame, class: 'primary' },
                    { text: '参观当地茶馆', action: showWlmqTeahouseImages, class: 'secondary' }
                ], 'tea_merchant');
            }
            break;
    }
}

// 检查是否可以前往目标城市 
// 1. 修改canTravelTo函数，支持龙坞完成后的前进
function canTravelTo(cityId) {
    if (gameState.freeExploration) return true;

    const cityOrder = ['longwu', 'luoyang', 'xian', 'lanzhou', 'jiayuguan', 'dunhuang', 'wulumuqi'];
    const currentIndex = cityOrder.indexOf(gameState.currentCity);
    const targetIndex = cityOrder.indexOf(cityId);

    // 特殊情况：在龙坞时，如果完成了任务，可以前往洛阳
    if (gameState.currentCity === 'longwu' && gameState.longwuCompleted && cityId === 'luoyang') {
        return true;
    }

    return targetIndex === currentIndex + 1;
}

// 2. 修改城市点击处理逻辑，完成主线后开启自由探索
document.querySelectorAll('.city-node').forEach(node => {
    node.addEventListener('click', function () {
        if (!gameState.gameStarted) return;

        const cityId = this.id;

        // 龙坞剧情未完成时，不能点击其他城市
        if (!gameState.visitedLongwu && cityId !== 'longwu') {
            showToast('请先完成龙坞的约定。');
            return;
        }

        if (gameState.currentCity === cityId) {
            // 当前城市，显示剧情选项
            if (cityId === 'longwu' && gameState.storyCompleted) {
                // 番外入口 - 只有完成主线后才能进入
                showExtraStory();
            } else {
                triggerCityStory(cityId);
            }
        } else if (canTravelTo(cityId)) {
            // 可以前往的城市
            travelToCity(cityId);
        } else {
            // 不能前往的城市
            if (gameState.storyCompleted) {
                // 主线完成后开启自由探索，可以访问任意城市
                travelToCity(cityId);
                // 触发知识问答/知识卡片
                setTimeout(() => {
                    showKnowledgeCard(cityId);
                }, 1000);
            } else {
                showToast('丝绸之路需循序渐进。');
            }
        }
    });
});

// 前往城市
function travelToCity(cityId) {
    const city = cityData[cityId];
    const character = document.getElementById('character');
    const targetNode = document.getElementById(cityId);

    // 移除之前城市的激活状态
    document.querySelectorAll('.city-node').forEach(node => {
        node.classList.remove('active');
    });

    // 激活目标城市
    targetNode.classList.add('active');

    // 移动角色
    const rect = targetNode.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2 - 20;
    const targetY = rect.top + rect.height / 2 - 20;

    anime({
        targets: character,
        left: targetX + 'px',
        top: targetY + 'px',
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
            gameState.currentCity = cityId;
            gameState.visitedCities.push(cityId);

            if (!gameState.freeExploration)
            // 消耗体力
            {
                gameState.health = Math.max(0, gameState.health - 2);
                updateStatusBars();
            }
            // 触发城市剧情
            setTimeout(() => {
                triggerCityStory(cityId);
            }, 500);

            checkGameEnd();
        }
    });
}

// 龙坞小地图相关函数
function showLongwuMiniMap() {
    document.getElementById('longwu-mini-map').style.display = 'flex';
    updateLongwuMiniMap();
}

function closeLongwuMiniMap() {
    document.getElementById('longwu-mini-map').style.display = 'none';
}

function updateLongwuMiniMap() {
    const nodes = document.querySelectorAll('#longwu-mini-map .mini-map-node');
    nodes.forEach(node => {
        node.classList.remove('available', 'unavailable');
        if (gameState.longwuPathChosen) {
            const targetNodeId = `longwu-${gameState.longwuPathChosen}`;
            if (node.id === targetNodeId) {
                node.classList.add('available');
            } else {
                node.classList.add('unavailable');
            }
        } else {
            // 茶馆节点可用
            if (node.id === 'longwu-teahouse') {
                node.classList.add('available');
            } else {
                node.classList.add('unavailable');
            }
        }
    });
}

function selectLongwuNode(nodeType) {
    // 如果已完成龙坞剧情，允许自由选择任何选项
    if (gameState.visitedLongwu) {
        closeLongwuMiniMap();

        switch (nodeType) {
            case 'teahouse':
                // 修改：完成龙坞剧情后点击茶馆直接显示新疆茶馆介绍
                showXinjiangTeahouseImages();
                break;
            case 'tea-mountain':
                // 修改：完成龙坞剧情后点击茶山直接开始采茶游戏
                startTeaPickingGame();
                break;
            case 'tea-shop':
                showXinjiangTeahouseImages();
                break;
        }
        return;
    }

    // 原有的逻辑：未完成龙坞剧情时的限制
    if (gameState.longwuPathChosen && nodeType !== gameState.longwuPathChosen) {
        showToast('可别误了今年的新茶。');
        return;
    }

    closeLongwuMiniMap();

    switch (nodeType) {
        case 'teahouse':
            startTeaTasting();
            break;
        case 'tea-mountain':
            startTeaPickingGame();
            break;
        case 'tea-shop':
            showXinjiangTeahouseImages();
            break;
    }
}

function showXinjiangTeahouseImages() {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '新疆茶馆';

    const images = [
        { src: 'xingjiang-teahouse/tea.jpg', name: '龙井茶', desc: '正宗的龙井茶叶，香气浓郁', key: 'tea' },
        { src: 'xingjiang-teahouse/cookie.jpg', name: '龙井融香馕', desc: '传统手工制作的美味饼干', key: 'cookie' },
        { src: 'xingjiang-teahouse/cake.jpg', name: '茶味蛋糕', desc: '香甜可口的特色蛋糕', key: 'cake' },
        { src: 'xingjiang-teahouse/milk_tea.jpg', name: '奶茶', desc: '浓郁香醇的新疆奶茶', key: 'milk_tea' },
        { src: 'xingjiang-teahouse/roast_mutton.jpg', name: '茶味烤羊', desc: '香喷喷的新疆烤羊肉', key: 'roast_mutton' }
    ];

    content.innerHTML = `
                <div style="text-align: center;">
                    <p style="margin-bottom: 20px;">欢迎来到新疆茶馆，这里有各种美味的新疆特色食品：</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                        ${images.map((item, index) => {
        // 检查图片是否已查看
        const isViewed = gameState.xinjiangTeahouseImagesViewed[item.key];
        const style = isViewed ?
            'border: 2px solid #ccc; border-radius: 10px; padding: 10px; cursor: pointer; transition: all 0.3s; background-color: #f0f0f0; opacity: 0.7;' :
            'border: 2px solid var(--primary-green); border-radius: 10px; padding: 10px; cursor: pointer; transition: all 0.3s;';

        return `
                                <div style="${style}" onclick="showTeahouseItemDetail('${item.key}')" onmouseover="this.style.background='${isViewed ? '#f0f0f0' : 'var(--primary-green)'}'; this.style.color='${isViewed ? 'var(--text-dark)' : 'white'}';" onmouseout="this.style.background='${isViewed ? '#f0f0f0' : 'transparent'}'; this.style.color='${isViewed ? 'var(--text-dark)' : 'var(--text-dark)'}';">
                                    <img src="${item.src}" alt="${item.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
                                    <div style="font-weight: bold; margin-bottom: 5px;">${item.name}</div>
                                    <div style="font-size: 12px;">${item.desc}</div>
                                </div>
                            `;
    }).join('')}
                    </div>
                </div>
            `;

    container.style.display = 'flex';
}

// 显示茶馆物品详细介绍
function showTeahouseItemDetail(itemKey) {
    const items = {
        'tea': {
            name: '龙井茶',
            desc: '正宗的龙井茶叶，香气浓郁',
            image: 'xingjiang-teahouse/tea_int.png'
        },
        'cookie': {
            name: '龙井融香馕',
            desc: '传统手工制作的美味饼干',
            image: 'xingjiang-teahouse/cookie_int.png'
        },
        'cake': {
            name: '茶味蛋糕',
            desc: '香甜可口的特色蛋糕',
            image: 'xingjiang-teahouse/cake_int.png'
        },
        'milk_tea': {
            name: '奶茶',
            desc: '浓郁香醇的新疆奶茶',
            image: 'xingjiang-teahouse/milk_tea_int.png'
        },
        'roast_mutton': {
            name: '茶味烤羊',
            desc: '香喷喷的新疆烤羊肉',
            image: 'xingjiang-teahouse/roast_muttion_int.png'
        }
    };

    const item = items[itemKey];
    if (!item) return;

    // 更新游戏状态以跟踪已查看的图片
    if (!gameState.xinjiangTeahouseImagesViewed[itemKey]) {
        gameState.xinjiangTeahouseImagesViewed[itemKey] = true;
    }

    // 关闭茶馆选择界面
    document.getElementById('minigame-container').style.display = 'none';

    // 显示大图详细介绍
    showDialog(`${item.name} - 详细介绍`,
        `<div style="text-align: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 98%; height: auto; max-height: 600px; object-fit: contain; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin-bottom: 20px; font-size: 22px;">${item.desc}</p>
                    <button class="dialog-btn primary" onclick="selectTeahouseItem('${item.name}')" style="font-size: 20px; padding: 18px 35px; margin: 15px;">享用</button>
                </div>`,
        [], 'tea_merchant'
    );
}

// 选择茶馆物品
function selectTeahouseItem(itemName) {
    // 更新游戏状态以跟踪已查看的图片
    const imageKeys = {
        '龙井茶': 'tea',
        '龙井融香馕': 'cookie',
        '茶味蛋糕': 'cake',
        '奶茶': 'milk_tea',
        '茶味烤羊': 'roast_mutton'
    };

    const key = imageKeys[itemName];
    if (key && !gameState.xinjiangTeahouseImagesViewed[key]) {
        gameState.xinjiangTeahouseImagesViewed[key] = true;
    }

    gameState.health = Math.min(100, gameState.health + 1);
    gameState.mood = Math.min(100, gameState.mood + 3);
    updateStatusBars();
    showSuccessMessage(`享用了 ${itemName}！`);

    // 关闭对话框并返回茶馆主界面
    closeDialog();
    showXinjiangTeahouseImages();
}

// 乌鲁木齐小地图相关函数
function showWlmqMiniMap() {
    document.getElementById('wlmq-mini-map').style.display = 'flex';
    updateWlmqMiniMap();
}

function closeWlmqMiniMap() {
    document.getElementById('wlmq-mini-map').style.display = 'none';
}

function updateWlmqMiniMap() {
    const nodes = document.querySelectorAll('#wlmq-mini-map .mini-map-node');
    nodes.forEach(node => {
        node.classList.remove('available', 'unavailable');

        if (!gameState.wlmqCompleted.bazaar) {
            // 只能点击大巴扎
            if (node.id === 'wlmq-bazaar') {
                node.classList.add('available');
            } else {
                node.classList.add('unavailable');
            }
        } else if (!gameState.wlmqCompleted.teahouse || !gameState.wlmqCompleted.butterTea) {
            // 大巴扎完成，其他两个可用
            if (node.id === 'wlmq-bazaar') {
                node.classList.add('unavailable');
            } else {
                node.classList.add('available');
            }
        } else {
            // 全部完成
            node.classList.add('available');
        }
    });
}

function selectWlmqNode(nodeType) {
    // 如果大巴扎未完成，只能访问大巴扎
    if (!gameState.wlmqCompleted.bazaar && nodeType !== 'bazaar') {
        showToast('你还有更重要的事……');
        return;
    }

    switch (nodeType) {
        case 'bazaar':
            gameState.wlmqCompleted.bazaar = true;
            closeWlmqMiniMap(); // 自动关闭小地图
            storyWlmq();
            break;
        case 'teahouse':
            gameState.wlmqCompleted.teahouse = true;
            closeWlmqMiniMap();
            showWlmqTeahouseImages(); // 修改这里，直接显示乌鲁木齐茶馆商品界面
            break;
        case 'butter-tea':
            gameState.wlmqCompleted.butterTea = true;
            closeWlmqMiniMap();
            startButterTeaGame();
            break;
    }

    updateWlmqMiniMap();

    // 检查是否完成乌鲁木齐所有内容
    if (gameState.wlmqCompleted.bazaar &&
        gameState.wlmqCompleted.teahouse &&
        gameState.wlmqCompleted.butterTea) {
        setTimeout(() => {
            closeWlmqMiniMap();
            showDialog('回到龙坞', '旅途归来，你常坐在茶馆里，给后生们讲那西域的故事……', [
                { text: '回到龙坞', action: storyEpilogue, class: 'primary' }
            ], 'tea_merchant');
        }, 2000);
    }
}

// 显示乌鲁木齐茶馆图片
function showWlmqTeahouseImages() {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '茶馆';

    const images = [
        { src: 'tea_house/joy1.jpg', name: '双景投影摆件', desc: '精美的疆风茶坞双景投影摆件', key: 'toy1' },
        { src: 'tea_house/joy2.jpg', name: '丝路茗皂', desc: '介绍丝绸之路的茗皂工艺', key: 'toy2' },
        { src: 'tea_house/joy3.jpg', name: '茶韵疆棉', desc: '精选棉花娃娃服饰', key: 'toy3' }
    ];

    content.innerHTML = `
                <div style="text-align: center;">
                    <p style="margin-bottom: 20px;">欢迎来到乌鲁木齐的茶馆，这里有许多精美的茶文化商品：</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                        ${images.map((item, index) => {
        // 检查图片是否已查看
        const isViewed = gameState.wlmqTeahouseImagesViewed[item.key];
        const style = isViewed ?
            'border: 2px solid #ccc; border-radius: 10px; padding: 10px; cursor: pointer; transition: all 0.3s; background-color: #f0f0f0; opacity: 0.7;' :
            'border: 2px solid var(--primary-green); border-radius: 10px; padding: 10px; cursor: pointer; transition: all 0.3s;';

        return `
                                <div style="${style}" onclick="showWlmqTeahouseItemDetail('${item.key}')" onmouseover="this.style.background='${isViewed ? '#f0f0f0' : 'var(--primary-green)'}'; this.style.color='${isViewed ? 'var(--text-dark)' : 'white'}';" onmouseout="this.style.background='${isViewed ? '#f0f0f0' : 'transparent'}'; this.style.color='${isViewed ? 'var(--text-dark)' : 'var(--text-dark)'}';">
                                    <img src="${item.src}" alt="${item.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
                                    <div style="font-weight: bold; margin-bottom: 5px;">${item.name}</div>
                                    <div style="font-size: 12px;">${item.desc}</div>
                                </div>
                            `;
    }).join('')}
                    </div>
                    
                </div>
            `;

    container.style.display = 'flex';
}

// 显示乌鲁木齐茶馆物品详细介绍
function showWlmqTeahouseItemDetail(itemKey) {
    const items = {
        'toy1': {
            name: '双景投影摆件',
            desc: '精美的疆风茶坞双景投影摆件',
            image: 'tea_house/toy1_int.png'
        },
        'toy2': {
            name: '丝路茗皂',
            desc: '介绍丝绸之路的茗皂工艺',
            image: 'tea_house/toy2_int.png'
        },
        'toy3': {
            name: '茶韵疆棉',
            desc: '精选棉花娃娃服饰',
            image: 'tea_house/toy3_int.png'
        }
    };

    const item = items[itemKey];
    if (!item) return;

    // 更新游戏状态以跟踪已查看的图片
    if (!gameState.wlmqTeahouseImagesViewed[itemKey]) {
        gameState.wlmqTeahouseImagesViewed[itemKey] = true;
    }

    // 关闭茶馆选择界面
    document.getElementById('minigame-container').style.display = 'none';

    // 显示大图详细介绍
    showDialog(`${item.name} - 详细介绍`,
        `<div style="text-align: center;">
                    <img src="${item.image}" alt="${item.name}" style="width: 98%; height: auto; max-height: 600px; object-fit: contain; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin-bottom: 20px; font-size: 22px;">${item.desc}</p>
                    <button class="dialog-btn primary" onclick="selectWlmqTeahouseItem('${item.name}')" style="font-size: 20px; padding: 18px 35px; margin: 15px;">购买</button>
                </div>`,
        [], 'tea_merchant'
    );
}

// 选择乌鲁木齐茶馆物品
function selectWlmqTeahouseItem(itemName) {
    // 更新游戏状态以跟踪已查看的图片
    const imageKeys = {
        '双景投影摆件': 'toy1',
        '丝路茗皂': 'toy2',
        '茶韵疆棉': 'toy3'
    };

    const key = imageKeys[itemName];
    if (key && !gameState.wlmqTeahouseImagesViewed[key]) {
        gameState.wlmqTeahouseImagesViewed[key] = true;
    }

    gameState.health = Math.min(100, gameState.health + 1);
    gameState.mood = Math.min(100, gameState.mood + 3);
    gameState.inventory.push(itemName);
    updateStatusBars();
    showSuccessMessage(`购买了 ${itemName}！`);

    // 关闭对话框并返回茶馆主界面
    closeDialog();
    showWlmqTeahouseImages();
}

// 更新状态栏
function updateStatusBars() {
    const healthBar = document.getElementById('health-bar');
    const moodBar = document.getElementById('mood-bar');

    healthBar.style.width = gameState.health + '%';
    moodBar.style.width = gameState.mood + '%';

    // 检查特殊状态效果
    if (gameState.health >= 80) {
        healthBar.style.background = '#27AE60';
    } else if (gameState.health <= 20) {
        healthBar.style.background = '#e74c3c';
    }

    if (gameState.mood >= 80) {
        moodBar.style.background = '#F39C12';
    } else if (gameState.mood <= 20) {
        moodBar.style.background = '#e74c3c';
    }
}

// 检查游戏结束
function checkGameEnd() {
    if (gameState.health <= 0) {
        showGameOver('旅途终结', '大夫......我要大夫......\n\n你的健康状况恶化，无法继续前行。茶商之路就此终结。');
    } else if (gameState.mood <= 0) {
        showGameOver('归乡心切', '好难过......想回家T-T\n\n你的心情低落至极，思乡之情难以抑制。你决定放弃西行，返回龙坞茶镇。');
    } else if (gameState.health >= 80) {
        showSuccessMessage('身强体壮');
    } else if (gameState.mood >= 80) {
        showSuccessMessage('怡然自得');
    }
}

// 显示游戏结束
function showGameOver(title, message) {
    document.getElementById('game-over-title').textContent = title;
    document.getElementById('game-over-message').innerHTML = message;
    document.getElementById('game-over-overlay').style.display = 'flex';
}

// 重新开始游戏
function restartGame() {
    location.reload();
}

// 显示对话框 - 优化NPC显示
function showDialog(title, content, buttons, npcType = 'none') {
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-content').innerHTML = content;

    // 设置NPC形象和名称
    const npcImage = document.getElementById('dialog-npc-image');
    const npcName = document.getElementById('dialog-npc-name');

    if (npcType !== 'none' && npcImages[npcType]) {
        npcImage.style.backgroundImage = `url('${npcImages[npcType]}')`;
        npcName.textContent = getNpcName(npcType);
        npcImage.style.display = 'block';
        npcName.style.display = 'block';
    } else {
        npcImage.style.display = 'none';
        npcName.style.display = 'none';
    }

    const buttonsContainer = document.getElementById('dialog-buttons');
    buttonsContainer.innerHTML = '';

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = `dialog-btn ${button.class || 'primary'}`;
        btn.textContent = button.text;
        btn.onclick = button.action;
        buttonsContainer.appendChild(btn);
    });

    document.getElementById('dialog-overlay').style.display = 'flex';
}

// 获取NPC名称
function getNpcName(npcType) {
    const names = {
        tea_merchant: '我',
        villager: '同乡',
        innkeeper: '掌柜',
        traveler: '旅人',
        hu_merchant: '胡商',
        elder: '长者',
        teahouse_owner: '茶馆老板',
        hu_girl: '胡姬',
        camel_passenger: '骆驼客',
        peddler: '小贩'
    };
    return names[npcType] || '';
}

// 关闭对话框
function closeDialog() {
    document.getElementById('dialog-overlay').style.display = 'none';
}

// 显示成功消息
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 2000);
}

// 关闭小游戏
function closeMinigame() {
    document.getElementById('minigame-container').style.display = 'none';
}

// 关闭背包
function closeInventory() {
    document.getElementById('inventory-overlay').style.display = 'none';
}

// 背包按钮点击
document.getElementById('inventory-btn').addEventListener('click', function () {
    document.getElementById('inventory-overlay').style.display = 'flex';
});

/* ====== 剧情函数开始 ====== */

/* ====== 龙坞 ====== */
function storyLongwu() {
    showDialog('龙坞茶馆', '你是龙坞茶镇土生土长的人，你从出生起便与龙井结下了不解之缘。<br><br>在你二十多岁那年，你的同乡自洛阳卖茶归来。你们约在茶馆碰头，点了一碟子定胜糕配龙井茶。在龙井茶汤上的氤氲混着米糕松软的甜香浮动在你们二人之间时，同乡向你说起了他在洛阳见到的新奇事。', [
        { text: '继续倾听', action: storyLongwuPart2, class: 'primary' }
    ], 'villager');
}

function storyLongwuPart2() {
    showDialog('同乡的故事', '同乡兴奋地说道："欸，你知道吗？之前啊好多人把茶叶带到西域去卖，换了好多良马和毛皮回来。那些马啊个个膘肥体壮，那些毛皮用来做的衣裳冬天穿着可暖和了。"<br><br>他说着从口袋里掏出了块东西，在你眼前晃了晃，又飞速揣回兜里。"这叫和田玉，是我从一个同行手上换来的，花了我不少银子呢。"', [
        { text: '好奇追问', action: storyLongwuPart3, class: 'primary' },
        { text: '不感兴趣', action: storyEndLazy, class: 'secondary' }
    ], 'villager');
}

function storyLongwuPart3() {
    showDialog('西域传闻', '同乡向你讲起了他听到的传闻。<br><br>从洛阳去西域要过一片风沙漫天、草木稀疏的野地，不同于江南的轻声细语，走在那里能听到干燥的驼铃阵阵在旷野里回荡。有时会遇到绿洲，热情好客的村庄牧民用羊奶、奶酪招待来往的商客。快到敦煌时，道旁的佛窟渐多，进窟里拜一拜，能保佑旅途平安。到了西域...<br><br>你听着他的话入了迷，脑中不禁构想起西域的模样。', [
        { text: '决定西行', action: storyLongwuDecision, class: 'primary' }
    ], 'villager');
}

function storyLongwuDecision() {
    showDialog('远行准备', '第二日苏醒的你，默默地做了一个决定，你要去西域。<br><br>去西域之前，你决定：', [
        { text: '去茶馆详谈', action: storyLongwuTeahouse, class: 'primary' }
    ], 'tea_merchant');
}

function storyLongwuTeahouse() {
    showDialog('茶馆约定', '你来到茶馆，这里是你和同乡约定的地方。<br><br>茶馆老板说："年轻人，要远行西域可不是件容易的事。你可以先去茶山采些新茶，或者去茶行买些上好的茶叶。听说最近镇上新开了家新疆茶馆，那里的奶茶别有一番风味。"<br><br>你决定：', [
        { text: '去茶山采茶', action: () => chooseLongwuPath('tea-mountain'), class: 'primary' },
        // { text: '去茶行购买', action: () => chooseLongwuPath('tea-shop'), class: 'secondary' },
        { text: '去新疆茶馆', action: () => chooseLongwuPath('teahouse'), class: 'secondary' }
    ], 'teahouse_owner');
}

function chooseLongwuPath(path) {
    gameState.longwuPathChosen = path;
    closeDialog();

    if (path === 'teahouse') {
        // 直接进入新疆茶馆
        showXinjiangTeahouseImages();
    } else {
        showLongwuMiniMap();
    }
}

function storyLongwuTeaPicking() {
    gameState.inventory.push('自制龙井茶');
    gameState.mood += 10;
    updateStatusBars();
    showDialog('采茶归来', '你亲自上山采茶，精心炒制了上好的龙井茶。茶香清雅，品质上乘。<br><br>临走前，你告别了乡里，请了隔壁的婶子帮你看家，带着家当和几车茶叶，踏上了前路。', [
        {
            text: '踏上征途', action: () => {
                closeDialog();
                gameState.longwuCompleted = true;
            }, class: 'primary'
        }
    ], 'tea_merchant');
}

function storyLongwuTeaBuying() {
    gameState.inventory.push('精选龙井茶');
    gameState.mood += 5;
    updateStatusBars();
    showDialog('购茶备行', '你在茶行购买了上等的龙井茶，虽然花费了一些银子，但茶叶品质优良。<br><br>临走前，你告别了乡里，请了隔壁的婶子帮你看家，带着家当和几车茶叶，踏上了前路。', [
        {
            text: '踏上征途', action: () => {
                closeDialog();
                gameState.longwuCompleted = true;
            }, class: 'primary'
        }
    ], 'tea_merchant');
}

// 番外故事
function showExtraStory() {
    showDialog('番外·闲坐茶馆', '旅途归来，你常坐在茶馆里，给后生们讲那西域的故事……<br><br>你想重温哪段经历？', [
        { text: '品茶回味', action: showLongwuMiniMap, class: 'primary' },
        { text: '改日再来', action: closeDialog, class: 'secondary' }
    ], 'tea_merchant');
}

/* ====== 洛阳 ====== */
function storyLuoyang() {
    // 长途跋涉消耗
    gameState.health -= 2;
    updateStatusBars();

    showDialog('牡丹时节', '一段时间后，你到达了洛阳。<br><br>正值牡丹时节，满城花香。你与茶馆掌柜沾亲带故，他硬是留你在洛阳多呆了几日。<br><br>坐在姚黄牡丹前，你们二人互换了一壶茶。你抿了一口碧潭飘雪，茉莉花的香气在舌尖萦绕，配上牡丹糕别是一般滋味。', [
        { text: '继续', action: storyLuoyangPart2, class: 'primary' }
    ], 'innkeeper');
}

function storyLuoyangPart2() {
    // 恢复一些状态
    gameState.health += 1;
    gameState.mood += 1;
    updateStatusBars();

    showDialog('掌柜相邀', '掌柜吹开水面上的龙井叶，问道："要不要在洛阳游玩几日？"', [
        { text: '同意游玩', action: startTeaQuiz, class: 'primary' },
        { text: '婉拒前行', action: storyLuoyangLeave, class: 'secondary' }
    ], 'innkeeper');
}

function storyLuoyangStay() {
    gameState.mood += 1;
    updateStatusBars();
    showDialog('洛阳美景', '你在洛阳游览了几日，欣赏了牡丹园的盛景，品尝了当地美食。<br><br>心情愉悦，精神焕发。', [
        { text: '继续西行', action: storyLuoyangLeave, class: 'primary' }
    ], 'tea_merchant');
}

function storyLuoyangLeave() {
    showDialog('告别洛阳', '道别了茶馆掌柜，你踏上了去长安的路程。<br><br><i>（长途跋涉，健康值-1）</i>', [
        { text: '继续前行', action: closeDialog, class: 'primary' }
    ], 'tea_merchant');
}


/* ====== 西安 ====== */
function storyXian() {
    // 长途跋涉消耗
    gameState.health -= 1;
    gameState.mood += 1; // 到达大城市心情提升
    updateStatusBars();

    showDialog('长安繁华', '长安真不愧是全国数一数二的大城市啊，你在心中感叹。<br><br>望着街上来往的胡人客商，街边别具一格的胡饼店、胡姬酒肆，你心里不禁有些激动。', [
        { text: '继续', action: storyXianPart2, class: 'primary' }
    ], 'tea_merchant');
}

function storyXianPart2() {
    showDialog('胡姬相邀', '突然，一间酒肆的胡姬叫住了你，她操着有些生硬的官话问你："你这可是今年的龙井？"<br><br>你点点头。<br><br>她温和地笑笑："可否卖我一些？"', [
        { text: '答应她', action: storyXianHelpHuJi, class: 'primary' },
        { text: '拒绝她', action: storyXianRejectHuJi, class: 'secondary' }
    ], 'hu_girl');
}

function storyXianHelpHuJi() {
    gameState.rejectedHuJi = false;
    gameState.mood += 1;
    gameState.health += 1;
    updateStatusBars();

    showDialog('胡姬相助', '她高兴地请你领略了当地的茶文化。<br><br>她见你穿着打扮仍为茶镇流行的衣裳，不禁好奇地问你："你准备了去西域的衣衫吗？"<br><br>你摇了摇头。<br><br>热情好客的胡姬就向你传授起了行商去西域的诀窍：头部带上帏帽或是皮帽，裹上细棉布头巾遮住口鼻只留眼睛；身上穿着窄袖短衫和长裤，裤脚扎进皮靴里，外套一件防风的皮质披风；货物用油布或者厚毡布裹住，再用绳子紧紧捆牢...', [
        {
            text: '感谢置办', action: () => {
                closeDialog();  // 关闭当前对话框
                // 延迟启动品茶小游戏，确保对话框已关闭
                setTimeout(() => {
                    startTeaTasting('xian');  // 启动西安品茶小游戏
                }, 300);
            }, class: 'primary'
        }
    ], 'hu_girl');
}

function storyXianRejectHuJi() {
    gameState.rejectedHuJi = true;
    showDialog('错失良机', '害怕库存不多，你便拒绝了她的请求，她失落地转身离开了。<br><br>你没有获得西域行商的经验，这可能会在后面的旅途中带来困难。', [
        { text: '继续', action: storyXianPrepare, class: 'primary' }
    ], 'tea_merchant');
}

function storyXianPrepare() {
    if (!gameState.rejectedHuJi) {
        showDialog('准备就绪', '你听后连忙感谢她，前去置办了这些东西。<br><br>现在你已经做好了西行的一切准备。', [
            { text: '在长安游览', action: storyXianTour, class: 'primary' },
            { text: '出发去兰州', action: closeDialog, class: 'secondary' }
        ], 'hu_girl');
    } else {
        showDialog('继续前行', '办完事情后，你选择：', [
            { text: '在长安游览', action: storyXianTour, class: 'primary' },
            { text: '出发去兰州', action: closeDialog, class: 'secondary' }
        ], 'tea_merchant');
    }
}

function storyXianTour() {
    gameState.mood += 1;
    updateStatusBars();
    showDialog('长安风光', '你在长安游览了几日，欣赏了大雁塔的雄伟，品尝了各种美食。<br><br>这座古城的繁华让你大开眼界，心情愉悦。', [
        { text: '出发去兰州', action: closeDialog, class: 'primary' }
    ], 'tea_merchant');
}

/* ====== 兰州 ====== */
function storyLanzhou() {
    // 长途跋涉消耗
    gameState.health -= 2;
    updateStatusBars();

    showDialog('黄河之都', '从长安到兰州的路上，你见到了渭河在平原上蜿蜒前行，河两旁广袤的农田和错落有致的村庄，是你在层层茶山中不曾见到的风光。翻越陇山，便到了陇中。道旁的草木渐稀，风沙逐渐开始多了起来。', [
        { text: '进入兰州城', action: storyLanzhouArrival, class: 'primary' }
    ], 'tea_merchant');
}

function storyLanzhouArrival() {
    showDialog('兰州选择', '到了兰州，你决定：', [
        { text: '去驿馆休息', action: storyLanzhouRest, class: 'primary' },
        { text: '去街上逛逛', action: storyLanzhouExplore, class: 'secondary' }
    ], 'tea_merchant');
}

function storyLanzhouRest() {
    gameState.mood += 1;
    updateStatusBars();
    showDialog('驿馆休息', '你睡了一个好觉，精神恢复了不少。<br><br>但你却对接下来要面临的挑战毫无准备...', [
        { text: '继续', action: storyLanzhouContinue, class: 'primary' }
    ], 'tea_merchant');
}

function storyLanzhouExplore() {
    showDialog('街市偶遇', '你在街上遇到了一位骆驼客，他正在与人交易。', [
        { text: '上前询问', action: startCulturalShopping, class: 'primary' },
        { text: '转身离开', action: storyLanzhouNoCamel, class: 'secondary' }
    ], 'camel_passenger');
}

function storyLanzhouCamelTrader() {
    gameState.gotCamel = true;
    showDialog('换得骆驼', '你想起自己的马匹不适合在风沙中前行，况且接下来的路途也不能及时给马喂食，于是你将马匹换成了骆驼。<br><br>骆驼客感谢你购买了他的骆驼，他向你传授了如何在沙漠中辨别水源和躲避沙尘暴。', [
        { text: '继续前行', action: storyLanzhouFood, class: 'primary' }
    ], 'camel_passenger');
}

function storyLanzhouNoCamel() {
    showDialog('错失良机', '你错过了换骆驼的机会，这可能会在后面的沙漠旅途中带来困难。', [
        { text: '继续前行', action: storyLanzhouFood, class: 'primary' }
    ], 'tea_merchant');
}

function storyLanzhouFood() {
    showDialog('胡饼小贩', '你继续向前走，遇到了卖胡饼的小贩。', [
        { text: '买胡饼尝尝', action: storyLanzhouBuyFood, class: 'primary' },
        { text: '不感兴趣', action: storyLanzhouNoFood, class: 'secondary' }
    ], 'peddler');
}

function storyLanzhouBuyFood() {
    gameState.boughtFood = true;
    gameState.health += 2;
    updateStatusBars();
    showDialog('备足干粮', '你发现这个很适合在沙漠中吃，于是买了很多当路上的干粮，并接受了小贩的建议买了肉干和干果路上吃。', [
        { text: '继续', action: storyLanzhouTeaHouse, class: 'primary' }
    ], 'peddler');
}

function storyLanzhouNoFood() {
    showDialog('错过补给', '感觉不好吃，你没买。<br><br>这可能会在后面的沙漠旅途中造成食物短缺。', [
        { text: '继续', action: storyLanzhouTeaHouse, class: 'primary' }
    ], 'tea_merchant');
}

function storyLanzhouTeaHouse() {
    gameState.health += 1;
    gameState.mood += 1;
    updateStatusBars();
    showDialog('兰州茶韵', '第二日，你在驿馆品尝了兰州特色的盖碗茶，甜香的口味让你心情舒畅。<br><br>茶汤入腹，你带着柔软的热意踏入了黄沙之中。', [
        { text: '进入沙漠', action: closeDialog, class: 'primary' }
    ], 'tea_merchant');
}

function storyLanzhouContinue() {
    showDialog('毫无准备', '你睡了一个好觉，但却毫无准备地踏上了旅程。', [
        { text: '进入沙漠', action: closeDialog, class: 'primary' }
    ], 'tea_merchant');
}

/* ====== 嘉峪关 ====== */
function storyJiayuguan() {
    // 沙漠消耗
    gameState.health -= 2;
    gameState.mood += 3;
    updateStatusBars();

    // 检查是否有足够准备
    if ((!gameState.gotCamel || !gameState.boughtFood) && !gameState.freeExploration) {
        if (!gameState.gotCamel) {
            showGameOver('尽打没准备的仗', '由于你带来的马匹长途跋涉，加上不适合在沙地行走，体力不支导致茶叶洒在了沙漠中，你不得已返回城中，无法再前往西域卖茶。');
            return;
        }
        if (!gameState.boughtFood) {
            showGameOver('抱憾终生', '由于缺乏食物，你在沙漠中饿晕了过去，被路过的商人救起，之后便再也没有踏上去往西域之路。');
            return;
        }
    }

    showDialog('沙漠商道', '不远处，你隐隐约约看见了一些特别的建筑，走近一看，发现是敦煌的佛窟。<br><br>有位画壁画的师傅向我讨了一杯茶，抿着清香的龙井，他给我的茶篓上画了幅小小的飞天。', [
        { text: '继续', action: storyJiayuguan2, class: 'primary' }
    ], 'tea_merchant');
}

function storyJiayuguan2() {
    gameState.mood += 1;
    updateStatusBars();
    showDialog('商道遇险', '进了敦煌城内，你见身边穿着异域服饰的人越来越多，心中明白，西域已然不远。<br><br>为了赶路，你匆忙踏上了去往西域的商道。走在路上，你隐约听到有人呼救，你选择：', [
        { text: '去看看情况', action: startFortressChallenge, class: 'primary' },
        { text: '赶路要紧', action: storyJiayuguanIgnore, class: 'secondary' }
    ], 'tea_merchant');
}

function storyJiayuguanHelp() {
    gameState.helpedCaravan = true;
    gameState.mood += 1;
    gameState.health += 1;
    updateStatusBars();
    showDialog('救助商队', '你发现是一支商队，他们的车马陷入了沙中，你帮助他们将货物从车上卸下，减轻重量防止进一步下陷。你指挥他们几人在周围铺上了毛皮，又找了根木棍将车子翘出。不多时，车马就从沙中出来了。<br><br>商队的商人拉着你的手感谢你。', [
        { text: '接受谢礼', action: storyJiayuguanReward, class: 'primary' }
    ], 'hu_merchant');
}

function storyJiayuguanIgnore() {
    showDialog('继续前行', '你头也不回地走了，继续自己的旅程。<br><br>虽然节省了时间，但你也错过了可能的帮助。', [
        { text: '继续前进', action: storyJiayuguanSandstorm, class: 'primary' }
    ], 'tea_merchant');
}

function storyJiayuguanReward() {
    gameState.inventory.push('蒙顶茶');
    showDialog('商队馈赠', '商人："太感谢您了，我全家老小可就指着这车货过活了呀。这东西您拿着，就当是我们的谢礼。"<br><br>他一边说着一边递过来一份茶包。你打开发现，是当地人常喝的蒙顶茶，品质十分不错。<br><br>"要是您以后遇上什么事，只要是我能帮的，我一定帮。"商人说道。', [
        { text: '继续前行', action: storyJiayuguanSandstorm, class: 'primary' }
    ], 'hu_merchant');
}

function storyJiayuguanSandstorm() {
    gameState.mood -= 5;
    gameState.health -= 5;
    updateStatusBars();

    // 检查是否有胡姬的教导
    if (gameState.rejectedHuJi) {
        showGameOver('平沙莽莽黄入天', '由于缺乏胡姬传授的沙漠生存经验，你无法有效应对沙尘暴，最终迷失在茫茫沙海之中。');
        return;
    }

    showDialog('沙尘暴来袭', '突然，你发现原本晴朗的天空骤然暗沉了下来，风在耳畔呼呼作响，扰乱了你的帏帽。植被在剧烈摇晃，沙粒开始四处"跳动"。你心下一沉，恐怕是遇到了沙尘暴。', [
        { text: '寻找避风处', action: storyJiayuguanSurvive, class: 'primary' }
    ], 'tea_merchant');
}

function storyJiayuguanSurvive() {
    showDialog('沙尘暴中求生', '你想起骆驼客对你说过的话，飞速找了一个背风的沙丘躲了起来，将骆驼车和帐篷围成了一个环形屏障。用遮沙巾捂住口鼻，并把你的食物和水抱在了怀里。你让骆驼卧倒，紧贴着它的身体挡风。<br><br>不多时，狂风裹着沙粒呼啸着朝人扑来。漫天都是黄沙，像给天地间拉上了一块黄灰色幕布。', [
        { text: '等待风暴过去', action: storyJiayuguanAfterStorm, class: 'primary' }
    ], 'tea_merchant');
}

function storyJiayuguanAfterStorm() {
    showDialog('风暴过后', '好在你的运气不错，只是几个时辰便结束了。你钻出帐篷，庆幸自己保住了命。<br><br>但你的货物却被黄沙掩盖，光凭你一人的努力无法将其搬出。', [
        { text: '寻求帮助', action: storyJiayuguanHelpArrives, class: 'primary' }
    ], 'tea_merchant');
}

function storyJiayuguanHelpArrives() {
    if (gameState.helpedCaravan || gameState.freeExploration) {
        gameState.mood += 5;
        updateStatusBars();
        showDialog('商队相助', '正当你一筹莫展之际，你听到了阵阵驼铃。你发现是之前帮助过的那只商队，他们见你陷入困难，纷纷过来帮忙。<br><br>在众人的齐心协力之下，你的货物获救了。', [
            { text: '分享香茶', action: storyJiayuguanTeaSharing, class: 'primary' }
        ], 'hu_merchant');
    } else {
        showGameOver('功亏一篑', '没有人来帮助，你无法独自搬出被黄沙掩埋的货物。这次西行之路就此终结。');
    }
}

function storyJiayuguanTeaSharing() {
    gameState.mood += 1;
    gameState.health += 1;
    updateStatusBars();
    showDialog('篝火茶会', '为了感谢他们，你在晚上燃起了篝火，泡了一壶龙井茶与他们分享。<br><br>他们带你围着篝火载歌载舞。<br><br>后来的路途十分顺利，你成功地到达了西域。', [
        { text: '进入敦煌地区', action: closeDialog, class: 'primary' }
    ], 'hu_merchant');
}

/* ====== 吐鲁番 ====== */
function storyDunhuang() {
    showDialog('吐鲁番集市', '你先来到了吐鲁番，这里是中原茶西传的重要中转站，你决定先卖一些龙井茶。<br><br>你在集市上摆了摊，但却没什么人来光顾。路过的当地人摇了摇头，说："我们这儿的砖茶喝了可顶饿了，你这茶滋味可淡，不解渴。"', [
        { text: '改良茶叶', action: storyTurpanInnovation, class: 'primary' }
    ], 'tea_merchant');
}

function storyTurpanInnovation() {
    gameState.mood += 1;
    updateStatusBars();
    showDialog('茶香创新', '你思来想去，决定在浓龙井里加入葡萄干。葡萄干的甜味中和了龙井的苦涩，又使茶汤带上一丝水果的风味。<br><br>这茶收到了当地人的喜爱，你很快就卖完了一部分。', [
        { text: '前往和田', action: storyKashgar, class: 'primary' }
    ], 'tea_merchant');
}

/* ====== 喀什 ====== */
function storyKashgar() {
    showDialog('和田集市', '你走在和田的集市上，遇到有人卖和田玉。你想起同乡宝贝那和田玉的样子，你不禁失笑，给他带了一块更大的。', [
        { text: '继续西行', action: storyKashgarTea, class: 'primary' }
    ], 'tea_merchant');
}

function storyKashgarTea() {
    gameState.mood += 1;
    updateStatusBars();
    showDialog('茶叶畅销', '你的茶叶受到了大家的喜爱。当地人多食肉类，而龙井茶恰好可以缓解肉的油腻。你的茶叶很快就卖了出去。', [
        { text: '前往喀什', action: storyKashgarCity, class: 'primary' }
    ], 'tea_merchant');
}

function storyKashgarCity() {
    gameState.health += 1;
    gameState.mood += 1;
    updateStatusBars();
    showDialog('喀什茶馆', '你在喀什的茶馆里品尝了当地特色的茶，里面融合了茯茶、西域药草、波斯香料等，喝起来别有一番风味。', [
        { text: '前往伊犁', action: storyYili, class: 'primary' }
    ], 'tea_merchant');
}

/* ====== 伊犁 ====== */
function storyYili() {
    gameState.health += 1;
    gameState.mood += 1;
    updateStatusBars();
    showDialog('伊犁奶茶', '当地人喜欢将茶与牛奶、盐混合起来饮用，既能驱寒保暖，又能消食解腻。并欣赏了敦煌宫殿内的壁画<br><br>你在伊犁第一次品尝了咸味的奶茶，这带给你不同于以往喝到所有茶的体验。', [
        { text: '前往终点', action: startMuralAppreciation, class: 'primary' }
    ], 'tea_merchant');
}

/* ====== 乌鲁木齐 ====== */
function storyWlmq() {
    showDialog('大巴扎见闻', '你来到了乌鲁木齐著名的大巴扎，这里是西域最繁华的市场之一。<br><br>各种香料、干果、地毯、玉石琳琅满目，空气中弥漫着烤馕和烤肉的香味。<br><br>探索完大巴扎后，你决定：', [
        {
            text: '去茶馆品茶', action: () => {
                closeDialog();
                showWlmqMiniMap();
            }, class: 'primary'
        },
        {
            text: '学习酥油茶制作', action: () => {
                closeDialog();
                showWlmqMiniMap();
            }, class: 'secondary'
        },
        {
            text: '结束探索', action: () => {
                closeDialog();
                showWlmqMiniMap();
            }, class: 'secondary'
        }
    ], 'tea_merchant');
}

function storyWlmqFinal() {
    showDialog('乌鲁木齐之旅结束', '你完成了乌鲁木齐的探索，学会了制作酥油奶茶，品尝了当地茶文化。<br><br>这段西域之旅让你收获颇丰，是时候返回龙坞了。', [
        { text: '返回龙坞', action: storyEpilogue, class: 'primary' }
    ], 'tea_merchant');
}

function storyEpilogue() {
    showDialog('回到龙坞', '旅途归来，你常坐在茶馆里，给后生们讲那西域的故事……<br><br>丝绸之路的见闻让你成为了茶镇里有名的"西域通"。', [
        {
            text: '完成旅程', action: () => {
                gameState.storyCompleted = true;
                gameState.freeExploration = true;
                closeDialog();
                showToast('恭喜！你完成了丝绸之路的旅程，现在可以自由探索了！');
            }, class: 'primary'
        }
    ], 'tea_merchant');
}

/* ====== 番外：回到龙坞 ====== */
function storyEpilogue() {
    showDialog('荣归故里', '你回到了茶镇，又约上同乡在茶馆见面。<br><br>白雾自茶杯中升起，缥然横在了你们之中。<br><br>同乡惊奇的说道："没想到你居然真去了......那里好玩吗？景色美吗？东西好吃吗？......"<br><br>你只能伸出手打断他的话。<br><br>你张开手，里面是一块羊脂白的和田玉。', [
        { text: '传奇完结', action: showVictory, class: 'primary' }
    ], 'villager');
}

function showVictory() {
    showGameOver('丝路茶商传奇', '恭喜你成功完成了从龙坞到乌鲁木齐的茶商之旅！<br><br>你不仅将龙井茶文化传播到了西域，还收获了珍贵的友谊和难忘的经历。<br><br>这是一段传奇的结束，也是新故事的开始...');
}

// 懒汉结局
function storyEndLazy() {
    showGameOver('懒得出门', '你对同乡的冒险故事不感兴趣，选择继续过着平静的茶镇生活。<br><br>虽然安逸，但你错过了人生中最精彩的冒险...');
}

/* ====== 剧情函数结束 ====== */
//游戏函数：
//游戏1：采茶小游戏
function startTeaPickingGame() {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '采茶小游戏';
    gameState.teaLeavesCollected = 0;

    content.innerHTML = `
                <p style="text-align: center; margin-bottom: 20px;">点击茶叶获得健康值！限时30秒</p>
                <div id="tea-game-area" style="position: relative; width: 100%; height: 300px; background: linear-gradient(to bottom, #87CEEB, #98FB98); border-radius: 10px; overflow: hidden;">
                    <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 14px;">
                        收集: <span id="tea-count">0</span> | 时间: <span id="time-left">30</span>s
                    </div>
                </div>
            `;

    container.style.display = 'flex';

    const gameArea = document.getElementById('tea-game-area');
    let timeLeft = 30;

    // 生成茶叶
    const generateTeaLeaf = () => {
        const leaf = document.createElement('div');
        leaf.className = 'tea-leaf';
        leaf.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
        leaf.style.top = Math.random() * (gameArea.offsetHeight - 30) + 'px';
        leaf.onclick = () => {
            leaf.remove();
            gameState.teaLeavesCollected++;
            gameState.health = Math.min(100, gameState.health + 1);
            updateStatusBars();
            document.getElementById('tea-count').textContent = gameState.teaLeavesCollected;
            showSuccessMessage('+1 健康值');
        };
        gameArea.appendChild(leaf);

        // 3秒后自动消失
        setTimeout(() => {
            if (leaf.parentNode) {
                leaf.remove();
            }
        }, 3000);
    };

    // 定时生成茶叶
    const leafInterval = setInterval(generateTeaLeaf, 1000);

    // 倒计时
    const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(leafInterval);
            clearInterval(timerInterval);

            // 游戏结束
            setTimeout(() => {
                closeMinigame();
                if (!gameState.freeExploration) {
                    showDialog('采茶完成', `你成功采集了${gameState.teaLeavesCollected}片茶叶，健康值提升了！`, [
                        { text: '继续旅程', action: storyLongwuTeaPicking, class: 'primary' }
                    ], 'tea_merchant');
                }
                else {
                    showDialog('采茶完成', `你成功采集了${gameState.teaLeavesCollected}片茶叶，健康值提升了！`, [
                        { text: '继续旅程', action: closeDialog, class: 'primary' }
                    ], 'tea_merchant');
                }
            }, 1000);
        }
    }, 1000);

    // 初始生成几片茶叶
    for (let i = 0; i < 3; i++) {
        setTimeout(generateTeaLeaf, i * 500);
    }
}
//游戏2
// 茶文化问答
// 在文件开头添加以下代码
const teaQuestions = [
    {
        question: "中国茶文化中，'茶圣'指的是谁？",
        options: ["陆羽", "吴觉农", "张天福", "陈宗懋"],
        correct: 0,
        explanation: "陆羽是唐代著名茶学家，被誉为'茶圣'，他撰写的《茶经》是世界上第一部茶叶专著。"
    },
    {
        question: "龙井茶属于哪种茶类？",
        options: ["红茶", "绿茶", "乌龙茶", "白茶"],
        correct: 1,
        explanation: "龙井茶属于绿茶类，产于杭州西湖龙井村一带，是中国十大名茶之一。"
    },
    {
        question: "丝绸之路开通于哪个朝代？",
        options: ["秦朝", "汉朝", "唐朝", "宋朝"],
        correct: 1,
        explanation: "丝绸之路正式开通于汉朝，由汉武帝派遣张骞出使西域开始。"
    },
    {
        question: "茶马古道主要连接的是哪两个地区？",
        options: ["中原与西域", "江南与东北", "西南与西北", "中原与西南"],
        correct: 3,
        explanation: "茶马古道主要连接中原地区与西南地区，是古代茶叶与马匹交易的重要通道。"
    },
    {
        question: "以下哪种不是传统的茶叶加工工艺？",
        options: ["发酵", "烘焙", "蒸馏", "揉捻"],
        correct: 2,
        explanation: "传统茶叶加工工艺主要包括萎凋、揉捻、发酵、烘焙等，蒸馏不是传统茶叶加工工艺。"
    }
];
function startTeaQuiz() {
    const question = teaQuestions[Math.floor(Math.random() * teaQuestions.length)];
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '茶文化问答';

    content.innerHTML = `
                <div style="text-align: center;">
                    <h3 style="margin-bottom: 20px; color: var(--text-dark);">${question.question}</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                        ${question.options.map((option, index) =>
        `<button class="dialog-btn secondary" onclick="selectAnswer(${index}, ${question.correct}, '${question.explanation}')" style="width: 100%;">${option}</button>`
    ).join('')}
                    </div>
                </div>
            `;

    container.style.display = 'flex';
}
// 选择答案
function selectAnswer(selected, correct, explanation) {
    if (selected === correct) {
        gameState.mood = Math.min(100, gameState.mood + 1);
        updateStatusBars();
        showSuccessMessage('+1 心情值');

        setTimeout(() => {
            closeMinigame();
            if (!gameState.freeExploration) {
                showDialog('回答正确！', explanation, [
                    { text: '继续旅程', action: storyLuoyangStay, class: 'primary' }
                ], 'tea_merchant');
            }
            else {
                showDialog('回答错误', explanation, [
                    { text: '继续旅程', action: closeDialog, class: 'primary' }
                ], 'tea_merchant');
            }
        }, 1000);
    } else {
        setTimeout(() => {
            closeMinigame();
            if (!gameState.freeExploration) {

                showDialog('回答错误', explanation, [
                    { text: '继续旅程', action: storyLuoyangLeave, class: 'primary' }
                ], 'tea_merchant');
            }
            else {
                showDialog('回答错误', explanation, [
                    { text: '继续旅程', action: closeDialog, class: 'primary' }
                ], 'tea_merchant');
            }
        }, 1000);
    }
}
//游戏3
// 品茶体验
function startTeaTasting(scene = 'xian') {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '品茶体验';

    // 根据场景显示不同的描述
    const description = scene === 'wlmq' ?
        '品味乌鲁木齐的传统茶艺，感受新疆茶文化的独特魅力。' :
        '品味古都西安的传统茶艺，感受千年茶文化的魅力。';

    content.innerHTML = `
                <div style="text-align: center;">
                    <img src="https://kimi-web-img.moonshot.cn/img/cdn.shopify.com/0672078f35428e88f3f67908186f5b48376f79af.jpg" alt="品茶" style="width: 200px; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin-bottom: 20px;">${description}</p>
                    <button class="dialog-btn primary" onclick="completeTeaTasting('${scene}')">品茶悟道</button>
                </div>
            `;

    container.style.display = 'flex';
}

// 完成品茶
function completeTeaTasting(scene = 'xian') {
    gameState.mood = Math.min(100, gameState.mood + 2);
    updateStatusBars();
    showSuccessMessage('+2 心情值');

    setTimeout(() => {
        closeMinigame();

        // 根据场景参数处理不同的逻辑
        if (scene === 'wlmq') {
            // 乌鲁木齐场景：标记茶馆完成并返回小地图
            gameState.wlmqCompleted.teahouse = true;
            showDialog('品茶感悟', '通过品茶，你感受到了新疆深厚的茶文化底蕴，心情变得愉悦！', [
                {
                    text: '继续旅程',
                    action: () => {
                        closeDialog();
                        // 在对话框关闭后显示小地图
                        setTimeout(() => {
                            showWlmqMiniMap();
                        }, 300);
                    },
                    class: 'primary'
                }
            ], 'innkeeper');
        } else if (scene === 'xian') {
            if (!gameState.freeExploration) {
                // 主线剧情模式下的西安场景
                showDialog('品茶感悟', '通过品茶，你感受到了西安深厚的茶文化底蕴，心情变得愉悦！', [
                    {
                        text: '继续旅程', action: () => {
                            closeDialog();
                            // 确保对话框关闭后进入后续剧情
                            setTimeout(() => {
                                storyXianPrepare();
                            }, 300);
                        }, class: 'primary'
                    }
                ], 'innkeeper');
            } else {
                // 自由探索模式下的西安场景
                showDialog('品茶感悟', '通过品茶，你感受到了西安深厚的茶文化底蕴，心情变得愉悦！', [
                    {
                        text: '继续旅程', action: () => {
                            closeDialog();

                        }, class: 'primary'
                    }
                ], 'innkeeper');
            }
        }
    }, 1000);
}

//游戏4
// 文创购买
function startCulturalShopping() {
    const items = [
        { name: '丝路茶具套装', desc: '精美陶瓷茶具', icon: '🍵' },
        { name: '茶叶香包', desc: '天然茶叶制作', icon: '🌿' },
        { name: '茶文化书籍', desc: '古代茶经抄本', icon: '📚' },
        { name: '丝路地图', desc: '手绘丝绸之路', icon: '🗺️' }
    ];

    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '文创购买';

    content.innerHTML = `
                <div style="text-align: center;">
                    <p style="margin-bottom: 20px;">选择你喜欢的文创产品：</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        ${items.map((item, index) =>
        `<div style="border: 2px solid var(--primary-green); border-radius: 10px; padding: 15px; cursor: pointer; transition: all 0.3s;" onclick="buyItem('${item.name}', '${item.desc}')" onmouseover="this.style.background='var(--primary-green)'; this.style.color='white';" onmouseout="this.style.background='transparent'; this.style.color='var(--text-dark);'">
                                <div style="font-size: 30px; margin-bottom: 10px;">${item.icon}</div>
                                <div style="font-weight: bold; margin-bottom: 5px;">${item.name}</div>
                                <div style="font-size: 12px;">${item.desc}</div>
                            </div>`
    ).join('')}
                    </div>
                </div>
            `;

    container.style.display = 'flex';
}
// 购买物品
function buyItem(name, desc) {
    gameState.inventory.push(name);
    gameState.mood = Math.min(100, gameState.mood + 1);
    updateStatusBars();
    showSuccessMessage(`获得 ${name}！`);

    setTimeout(() => {
        closeMinigame();
        if (!gameState.freeExploration) {
            showDialog('购买成功', `你购买了${name}，心情值提升了！这件文创产品将成为你旅途中的美好回忆。`, [
                { text: '继续旅程', action: storyLanzhouCamelTrader, class: 'primary' }
            ], 'tea_merchant');
        }
        else {
            showDialog('购买成功', `你购买了${name}，心情值提升了！这件文创产品将成为你旅途中的美好回忆。`, [
                { text: '继续旅程', action: closeDialog, class: 'primary' }
            ], 'tea_merchant');
        }
    }, 1000);
}

//游戏5
// 关城挑战
function startFortressChallenge() {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '关城挑战';

    content.innerHTML = `
                <div style="text-align: center;">
                    <img src="https://kimi-web-img.moonshot.cn/img/www.thoughtco.com/868b21b9beda0e16a42d975e195ef77e1aed3a71.jpg" alt="嘉峪关" style="width: 250px; height: 180px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin-bottom: 20px;">通过嘉峪关需要体力和智慧的双重考验。</p>
                    <button class="dialog-btn primary" onclick="completeFortressChallenge()">接受挑战</button>
                </div>
            `;

    container.style.display = 'flex';
}
// 完成关城挑战
function completeFortressChallenge() {
    const success = Math.random() > 0.3; // 70%成功率

    if (success) {
        gameState.health = Math.min(100, gameState.health + 2);
        gameState.mood = Math.min(100, gameState.mood + 1);
        updateStatusBars();
        showSuccessMessage('挑战成功！');

        setTimeout(() => {
            closeMinigame();
            if (!gameState.freeExploration) {
                showDialog('挑战成功', '你成功通过了嘉峪关的考验！体力和心情都得到了提升。你继续前行。', [
                    { text: '继续旅程', action: storyJiayuguanHelp, class: 'primary' }
                ], 'tea_merchant');
            }
            else {
                showDialog('挑战成功', '你成功通过了嘉峪关的考验！体力和心情都得到了提升。你继续前行。', [
                    { text: '继续旅程', action: closeDialog, class: 'primary' }
                ], 'tea_merchant');
            }
        }, 1000);
    } else {
        gameState.health = Math.max(0, gameState.health - 5);
        updateStatusBars();

        setTimeout(() => {
            closeMinigame();
            showDialog('挑战失败', '关城挑战有些困难，消耗了一些体力，但获得了宝贵的经验。你继续前行。', [
                { text: '继续旅程', action: storyJiayuguanHelp, class: 'primary' }
            ], 'tea_merchant');
        }, 1000);
    }

    checkGameEnd();
}
//游戏6
// 敦煌壁画欣赏
function startMuralAppreciation() {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '壁画欣赏';

    content.innerHTML = `
                <div style="text-align: center;">
                    <img src="https://kimi-web-img.moonshot.cn/img/s.wsj.net/411d44803dc130700123a51b3f25d13ea24d5491.jpg" alt="敦煌壁画" style="width: 280px; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin-bottom: 20px;">欣赏莫高窟精美的壁画，感受古代茶文化的艺术魅力。</p>
                    <button class="dialog-btn primary" onclick="completeMuralAppreciation()">品茶赏画</button>
                </div>
            `;

    container.style.display = 'flex';
}
// 完成壁画欣赏
function completeMuralAppreciation() {
    gameState.health = Math.min(100, gameState.health + 1);
    gameState.mood = Math.min(100, gameState.mood + 1);
    updateStatusBars();
    showSuccessMessage('+1 健康值 +1 心情值');

    setTimeout(() => {
        closeMinigame();
        if (!gameState.freeExploration) {
            showDialog('艺术熏陶', '敦煌壁画的精美艺术让你身心都得到了提升！', [
                { text: '继续旅程', action: closeDialog, class: 'primary' }
            ], 'tea_merchant');
        }
        else {
            showDialog('艺术熏陶', '敦煌壁画的精美艺术让你身心都得到了提升！', [
                { text: '继续旅程', action: closeDialog, class: 'primary' }
            ], 'tea_merchant');
        }
    }, 1000);
}

//游戏7
// 酥油奶茶制作
function startButterTeaGame() {
    const container = document.getElementById('minigame-container');
    const content = document.getElementById('minigame-content');
    const title = document.getElementById('minigame-title');

    title.textContent = '酥油奶茶制作';

    content.innerHTML = `
                <div style="text-align: center;">
                    <div style="width: 200px; height: 200px; background: linear-gradient(45deg, #DAA520, #B8860B); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 60px; color: white; animation: rotate 2s linear infinite;">🥛</div>
                    <p style="margin-bottom: 20px;">学习制作正宗的新疆酥油奶茶</p>
                    <button class="dialog-btn primary" onclick="completeButterTea()">开始学习</button>
                </div>
                <style>
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                </style>
            `;

    container.style.display = 'flex';
}
// 完成酥油奶茶制作
function completeButterTea() {
    gameState.health = Math.min(100, gameState.health + 2);
    gameState.mood = Math.min(100, gameState.mood + 2);
    gameState.inventory.push('酥油奶茶配方');
    updateStatusBars();
    showSuccessMessage('+2 健康值 +2 心情值');

    setTimeout(() => {
        closeMinigame();
        if (!gameState.freeExploration) {
            showDialog('制作成功', '你学会了制作正宗的新疆酥油奶茶！这将是你丝路之旅最美好的回忆。', [
                { text: '完成旅程', action: storyWlmqFinal, class: 'primary' }
            ], 'tea_merchant');
        }
        else {
            showDialog('制作成功', '你学会了制作正宗的新疆酥油奶茶！这将是你丝路之旅最美好的回忆。', [
                { text: '完成旅程', action: closeDialog, class: 'primary' }
            ], 'tea_merchant');
        }
    }, 1000);
}
// 页面加载完成后初始化游戏
window.addEventListener('load', initGame);

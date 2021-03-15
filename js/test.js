//随机数
function randomNum(min,max) {
    return parseInt(Math.random() * (max-min)+min);
}
//让背景动起来
var jsBg1 =document.getElementById('bg1');
var jsBg2 =document.getElementById('bg2');
var timerBg=setInterval(function () {
    jsBg1.style.top=jsBg1.offsetTop + 1 + 'px';
    jsBg2.style.top=jsBg2.offsetTop + 1 + 'px';
    if(jsBg1.offsetTop>=768){
        jsBg1.style.top= -768 + 'px';
    }else if(jsBg2.offsetTop>=768){
        jsBg2.style.top= -768 +'px';
    }
},5)
//让飞机动起来
//拖拽效果
var airplane = document.getElementById('airplane');
airplane.addEventListener('mousedown',function (e) {
    var baseX= e.pageX;
    var baseY= e.pageY;

    var moveX=0;
    var moveY=0;
    //给主屏幕添加鼠标拖动事件
    document.getElementById('mainScreen').addEventListener('mousemove',function (e) {
        moveX=e.pageX-baseX;
        baseX=e.pageX;
        moveY=e.pageY-baseY;
        baseY=e.pageY;
        console.log(baseX,baseY);
        airplane.style.left=airplane.offsetLeft + moveX + 'px';
        airplane.style.top=airplane.offsetTop + moveY + 'px';
    },false)
},false)
//发射子弹
var timerBullet = setInterval(function () {
    //创建子弹
    var bullent=document.createElement('div');
    document.getElementById('mainScreen').appendChild(bullent);
    bullent.className='bulled';
    bullent.style.left=airplane.offsetLeft+airplane.offsetWidth/2 + 'px';
    bullent.style.top=airplane.offsetTop + 'px';
    //让子弹飞
    var timerBulletFly = setInterval(function () {
        bullent.style.top=bullent.offsetTop -10 + 'px';
        if(bullent.style.top<-20){
            clearInterval(timerBulletFly);
            document.getElementById('mainScreen').removeChild(bullent);
        }
    },50)
    bullent.timer=timerBulletFly;
},500)
//敌人
var timerEnemy = setInterval(function () {
    //创建敌人
    var enemy=document.createElement('div');
    document.getElementById('mainScreen').appendChild(enemy);
    enemy.className='enemy';
    enemy.style.left= randomNum(0,document.getElementById('mainScreen').offsetWidth-enemy.offsetWidth) + 'px';
    enemy.style.top= '0px';
    //让敌人飞
    var timerEnemyFly = setInterval(function () {
        enemy.style.top=enemy.offsetTop + 10 + 'px';
        if(enemy.style.top>768){
            clearInterval(timerEnemyFly);
            document.getElementById('mainScreen').removeChild(enemy);
        }
    },50)
    enemy.timer= timerEnemyFly;
},500)
//消灭敌人
var timerCollisionDetection = setInterval(function () {
    var allEnemy = document.getElementsByClassName('enemy');
    var allBullet = document.getElementsByClassName('bulled');
    for (var i=0;i<allBullet.length;i++){
        for(var j=0;j<allEnemy.length;j++){
            var b= allBullet[i];
            var e=allEnemy[j];
            if(collisionDetection(b,e)){
                clearInterval(b.timer);
                clearInterval(e.timer);
                document.getElementById('mainScreen').removeChild(b);
                document.getElementById('mainScreen').removeChild(e);
                break;
            }
        }
    }

},200)
//碰撞检测
function collisionDetection(obj1,obj2) {
    var obj1Left=obj1.offsetLeft;
    var obj1Width=obj1Left+obj1.offsetWidth;
    var obj1Top=obj1.offsetTop;
    var obj1Height=obj1Top+obj1.offsetHeight;

    var obj2Left=obj2.offsetLeft;
    var obj2Width=obj2Left+obj2.offsetWidth;
    var obj2Top=obj2.offsetTop;
    var obj2Height=obj2Top+obj2.offsetHeight;

    if(!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)){
        return true;
    }else{
        return false;
    }
}
//死亡
var timerDie = setInterval(function () {

    var allEnemy = document.getElementsByClassName('enemy');
    for(var i=0;i< allEnemy.length;i++){
        if (collisionDetection(allEnemy[i],airplane)){
            for(var j=0;j<100;j++){
                clearInterval(j);
            }
        }
    }
},200)
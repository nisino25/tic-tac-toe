<template>
  <h1>Tic-tac-toe</h1>
  <div class="wrapper">
    <table id="bingotable" :style= "[ whoGotBingo? {opacity: 0.3} : '']">

          <!-- first row -->
          <tr class="first">
            <td  v-for="(bingo, i) in TableList" :key="i" @click="change(i)" :class="[bingo.finishedWith ? 'finishedTile' : '']"  >
              <div class="xmark" v-if="bingo.isFinished" ><span>&#10007;</span></div>
              <span v-if="i<3" :style="{color:bingo.color}"  >{{bingo.num}}</span>
            </td>
          </tr>

          <!-- second row -->
          <tr class="second">
            <td  v-for="(bingo, i) in TableList" :key="i" @click="change(i)" :class="[bingo.finishedWith ? 'finishedTile' : '']" >
              <div class="xmark" v-if="bingo.isFinished" ><span>&#10007;</span></div>
              <span v-if="i>=3 && i<6" :style="{color:bingo.color}"  >{{bingo.num}}</span>
            </td>
          </tr>

          <!-- third row -->
          <tr class="third">
            <td  v-for="(bingo, i) in TableList" :key="i" @click="change(i)" :class="[bingo.finishedWith ? 'finishedTile' : '']"  >
              <div class="xmark" v-if="bingo.isFinished"  ><span>&#10007;</span></div>
              <span v-if="i>=6 && i<9" :class="bingo.color" :style="{color:bingo.color}"  >{{bingo.num}}</span>
            </td>
          </tr>

          
         
        </table>
    <br>

    <div class="gameCondition">
      <div v-if="whoGotBingo === 'DRAW'"> 
        <h3> <span  style=" text-transform: uppercase;" >{{whoGotBingo}} game!</span></h3>
      </div>

      <div  v-if="!whoGotBingo">
        <span>Current Team: <span :style="{color: currentColor}" style=" text-transform: uppercase;" >{{currentColor}}</span></span>
        <br>
        <span v-if="currentNum !==undefined">Selecting Number: <span :style="{color: currentColor}">{{currentNum}}</span></span>
        <span v-else>Selecting Number: <span >Choosing...</span></span>
        <br>
        <span v-if="whoGotBingo">{{whoGotBingo}}</span>
      </div>

      <div v-if="whoGotBingo === 'red' || whoGotBingo === 'blue'">
        <h3>Team <span :style="{color: whoGotBingo}" style=" text-transform: uppercase;" >{{whoGotBingo}}</span> won!!!</h3>
      </div>
    </div>

    <hr>
    <div class="display">
      <div>
        <span class="teamName">Team: Red: </span>
        <span v-for="(item,i) in RedItemList" :key="i">
          <small v-if='item.used' style="opacity:0.4; color:red">{{item.num}}</small>
          <small v-else style="color:red" @click="choosingNum(item.num,'red')">{{item.num}}</small>
        </span>

        <br>
        <span class="teamName">Team: Blue: </span>

        <span v-for="(item,i) in BlueItemList" :key="i">
          <small v-if='item.used' style="opacity:0.4; color:blue">{{item.num}}</small>
          <small v-else style="color:blue" @click="choosingNum(item.num,'blue')">{{item.num}}</small>
        </span>


      </div>
    </div>

  </div>
</template>

<script>

export default {
  data(){
    return{
      TableList: [],
      prgoressList:[],
      RedItemList:[],
      BlueItemList:[],

      currentColor: undefined,
      currentNum: undefined,

      isItBingo: [],

      whoGotBingo: undefined,

    }
  },
  mounted(){

    this.currentColor = 'blue'
  //  db.collection("user-counter")
  //    .get()
  //    .then((querySnapshot) => {
  //      querySnapshot.forEach((doc) => {
  //        console.log(`${doc.id} => ${doc.data().TotalNum}`)
  //        this.fireData.push(doc.data().TotalNum)
  //        this.userNum = doc.data().TotalNum + 1
  //      })
  //    })

    // Setup for opponent team which is red team
    let i = 0
    while(i < 9){
      this.TableList.push({color: 'white', num: 0, finishedWith: false });
      i++
    }
    // console.log(this.TableList.length)

    i = 0
    while(i < 6){
      this.RedItemList.push({num: i +1, used: false });
      this.BlueItemList.push({num: i+1, used: false })
      i++
    }
  
  },
  methods:{
    change(num){
      if(this.whoGotBingo){
        return
      }

      if(this.currentNum === undefined){
        alert('Select your piece')
        return
      }

        
      if(this.TableList[num].num >= this.currentNum){
        alert('not big enough')
        return
      }
      if(this.TableList[num].color === this.currentColor){
         let r= confirm(`You wanna put it on your piece?`);
          if(!r){
            // this.movingRobber = false;
            return;
          }
      }
      this.TableList[num].color = this.currentColor
      this.TableList[num].num = this.currentNum
      
      if(this.currentColor === 'red'){
        this.RedItemList[this.currentNum-1].used = true
      }else{
        this.BlueItemList[this.currentNum-1].used = true
      }

      this.prgoressList.push({player: this.currentColor})

      this.changinTurn()


      

    },

    choosingNum(num,team){
      if(team !== this.currentColor){
        alert('selcet from your own color')
        return
      }
      this.currentNum = num
    },

    changinTurn(){
      this.checkBingo()
      this.currentNum = undefined
      if(this.prgoressList[this.prgoressList.length -1].player === 'red'){
        this.currentColor = 'blue'
      }else{
        this.currentColor = 'red'
      }
    },

    checkBingo(){

      // it is super important to call this function before changing the color

      // chekck eveyrtim when the tablelist is touched
      // only 8 cases
      let cur = this.currentColor

      let baseNum1 = 0;
      let baseNum2 = 1;
      let baseNum3 = 2;

      let count = 0
      let flag =false

      // checking horizontal

      while(count < 3){
        // console.log(`${baseNum1},${baseNum2},${baseNum3}`)
        if(this.TableList[baseNum1].color === cur && this.TableList[baseNum2].color === cur && this.TableList[baseNum3].color === cur){
          this.whoGotBingo = this.currentColor 
          this.changeColor(baseNum1,baseNum2,baseNum3)
          return;
        }
        baseNum1 = baseNum1 + 3
        baseNum2 = baseNum2 + 3
        baseNum3 = baseNum3 + 3
        count++
      }

      if(flag){
        return
      }

      // checking vertical
      count = 0
      baseNum1 = 0
      baseNum2 = 3
      baseNum3 = 6

      

      while(count < 3){
        // console.log(count)
        
        if(this.TableList[baseNum1].color === cur && this.TableList[baseNum2].color === cur && this.TableList[baseNum3].color === cur){
          this.whoGotBingo = this.currentColor
          this.changeColor(baseNum1,baseNum2,baseNum3)

          return;
        }
        baseNum1 = baseNum1 + 1
        baseNum2 = baseNum2 + 1
        baseNum3 = baseNum3 + 1
        count++
      }

      if(flag){
        return
      }

      // checking diagonal

      baseNum1 = 0
      baseNum2 = 4
      baseNum3 = 8

      if(this.TableList[baseNum1].color === cur && this.TableList[baseNum2].color === cur && this.TableList[baseNum3].color === cur){
        this.whoGotBingo = this.currentColor
        this.changeColor(baseNum1,baseNum2,baseNum3)

        return;
      }

      if(flag){
        return
      }

      // console.log('you reached me which is fine good nice check bro')

      baseNum1 = 2
      baseNum2 = 4
      baseNum3 = 6

      if(this.TableList[baseNum1].color === cur && this.TableList[baseNum2].color === cur && this.TableList[baseNum3].color === cur){
        this.whoGotBingo = this.currentColor
        this.changeColor(baseNum1,baseNum2,baseNum3)

        return;
      }

      // console.log('done checking')



    },

    changeColor(num1,num2,num3){
      this.TableList[num1].finishedWith = true
      this.TableList[num2].finishedWith = true
      this.TableList[num3].finishedWith = true
    },
  },
   watch:{
    whoGotBingo(){
      if(this.whoGotBingo === "DRAW"){
        alert('Draw Game!')
        return
      }
      alert(`We got winwner ${this.whoGotBingo}`)
    },
    TableList: {
      deep:true,
      handler() {
        this.currentNum =  undefined
        let count = 0
        console.log('yo called me?>')

        while(count < 6){
          // console.log('yo called me?>')
          if(!this.RedItemList[count].used){
            return
          }

          if(!this.BlueItemList[count].used){
            return
          }

          if(count === 5){
            // alert('Draw game')
            this.whoGotBingo = "DRAW"
          }

          // console.log('done checking: ' + count)
          
          count++
        }
        
        
      }
    },
   },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#bingotable {
  margin: 0 auto;
  text-align: center;
  /* width: 700px; */
  width: 20rem;
  height: 20rem;
  border-collapse: collapse;
  background: white;
  font-size: 300%;
}

th, td {
  font-family: Helvetica;
  margin: 0 auto;
  text-align: center;
  border: 3px solid black;
  width: 20%;
  height: 20%;
}

.finishedTile{
  background-color: #fada5e;
}

/* .display span {
  font-size: 100%;
} */

.teamName{
  font-size: 125%;
}

.display span small{
  margin-right: 12.5px;
  font-size: 250%;
}



.first td:nth-of-type(4),
.first td:nth-of-type(5),
.first td:nth-of-type(6),
.first td:nth-of-type(7),
.first td:nth-of-type(8),
.first td:nth-of-type(9){
  display: none;
}

.second td:nth-of-type(1),
.second td:nth-of-type(2),
.second td:nth-of-type(3),
.second td:nth-of-type(7),
.second td:nth-of-type(8),
.second td:nth-of-type(9){
  display: none;
}

.third td:nth-of-type(1),
.third td:nth-of-type(2),
.third td:nth-of-type(3),
.third td:nth-of-type(4),
.third td:nth-of-type(5),
.third td:nth-of-type(6){
  display: none;
}

</style>

<template>

  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>

  <body>
    <h4>{{showingPage}}</h4>

    <div class="view-counter" style="left:0; text-align:left;  margin-left: 0px; margin-bottom:10px; margin-top: -10px">
          <i class="far fa-eye" id="togglePassword" style="margin-right: 7.5px; cursor: pointer;"></i>
          <vue3-autocounter class="counter" ref='counter' :startAmount='0'  suffix=' Views' :endAmount="userNum" :duration='1.5'  separator=',' :autoinit='true' />
    </div>
    

    <div class="register" v-if="showingPage === 'register'">

      <div>
        <div class="LEFT" style="border: 3px solid  #16a085;">
          <h1>Sign up</h1>
          
          <input type="text"   placeholder="UserName" v-model="userName">

          <input type="submit" style="background: #16a085; " name="signup_submit" value="Start" @click="register()">
  
        </div>
      </div>

    </div>

    <div class="choice"  v-if="showingPage == 'choice'">
      <h2 style="margin-bottom:-50px; ">Welcome {{userName}}!</h2>

       <div>
        <div class="LEFT" style="border: 3px solid  	orangered;">
          <h1>Create a room</h1>
          <hr>
          
          
          <h4>Room number: {{this.userNum}}.</h4>

          
          <span>Required password?</span>
          <br>
          <input type="radio"  v-bind:value="true" v-model="needPassword">
          <label for='true'>Yes</label>
          <input type="radio" v-bind:value="false" v-model="needPassword">
          <label for="two">No</label>
          <br><br>

          <input type="text"   placeholder="Password..." v-model="currentPassword" v-if="needPassword" >


          <input type="submit" style="background: orangered; " name="signup_submit" value="Create" @click="createRoom()">
  
        </div>

        <h5>OR</h5>

        <div class="LEFT" style="border: 3px solid  ForestGreen; margin-top: 20px; margin-bottom:30px">
          <h1>Join a room </h1> 
          
          <hr>

          <button class="button2" style="float:left; text-align:right; margin-bottom:10px; position:relat" @click="getRoomData">Refresh <i class="fa fa-refresh " style="text-align:right"></i></button>
          

          <div v-if="availableRooms.length">
            <table class="rtable rtable--flip">
              
              <table class="rtable">
                <thead>
                  <tr>
                    <th style="font-size:100%">#</th>
                    <th>Host Name</th>
                    <th><i class="fa fa-lock" style="font-size:130%;"></i></th>
                    <th>Join</th>
                    <th><i class="fa fa-clock-o" style="font-size:130%;"></i></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(room, i) in availableRooms" :key="i">
                    <td>{{room.roomNumber}}</td>
                    <td>{{room.hostName}}</td>
                    <td v-if="!room.password" style="color: green">&#10003;</td>
                    <td v-else><i class="fa fa-lock" style="font-size:130%;color:red"></i></td>
                    <td><button style='' class="button button1" @click="joinRoom(i)">Go</button></td>
                    <td :style="{color:room.color}" >{{room.timeLeft}}</td>
                  </tr>
                </tbody>
              </table>


              
            </table>
          </div>
          <div v-else>
            <br>
            <h5>No room availble now</h5>
          </div>
          
  
        </div>
      </div>

    </div>

    <div class="waiting" v-if="showingPage == 'waiting'">

      <div v-if="playerRole == 'guest'">
        <!-- <div  v-if="waitingRoom.status == 'waiting'"> -->
        <div>
          <!-- <h1>{{theRoom.status}}</h1> -->
          <div class="LEFT" style="border: 3px solid  	CornflowerBlue;">
            <h1>{{waitingRoom.hostName}} confirming...</h1>
            <hr>
            
            <h4>Page: {{showingPage}}</h4>
            <h4>Host Name: {{waitingRoom.hostName}}</h4>
            <h4>Room number: {{waitingRoom.roomNumber}}</h4>
            <h4 v-if="waitingRoom.password">Password: {{waitingRoom.password}}</h4>
            <!-- <h4>Player showed up: {{playerShowedUp}}</h4> -->
            <h4>Time Left: {{waitingRoom.timeLeft}}</h4>
            <!-- <h4>Status: {{waitingRoom.status}}</h4> -->
            <!-- <h4>{{playerRole}}</h4> -->
            <h1>{{waitingRoom}}</h1>
            

            <input type="submit" style="background: orangered; " name="signup_submit" value="Cancel" @click="cancel()">/
    
          </div>

          
        </div>

      </div>

      <div v-if="playerRole == 'host'">
        <div  v-if="theRoom.status == 'waiting'">
          <!-- <h1>{{theRoom.status}}</h1> -->
          <div class="LEFT" style="border: 3px solid  	CornflowerBlue;">
            <h1>Waiting for a plyer...</h1>
            <hr>
            
            
            <h4>Host Name: {{theRoom.hostName}}</h4>
            <h4>Room number: {{theRoom.roomNumber}}</h4>
            <h4 v-if="theRoom.password">Password: {{theRoom.password}}</h4>
            <!-- <h4>Player showed up: {{playerShowedUp}}</h4> -->
            <h4>Time Left: {{theRoom.timeLeft}}</h4>
            <h4>Rejected: {{theRoom.rejected}}</h4>

            <input type="submit" style="background: orangered; " name="signup_submit" value="Cancel" >/
    
          </div>

          
        </div>
        <div v-else>
            <h2>{{theRoom.hostName}} vs {{theRoom.joinedplayer}} </h2>
        </div>
      </div>
      
    </div>

    <div class="confirmation" v-if="showingPage == 'confirmation'">

      <div>
        <div class="LEFT" style="border: 3px solid  #16a085;">
          <!-- <h3>confrimaing</h3> -->
          <h1>{{theRoom.joinedplayer}} <small>wants to join the room</small> </h1> 
          
          <button style='' class="button button3" @click="choice(true)">&#10003;</button>
          <!-- <br> -->
          <button style='' class="button button4" @click="choice(false)">X</button>

          <!-- <input type="submit" style="background: #16a085; " name="signup_submit" value="Start" @click="register()"> -->
  
        </div>
      </div>

    </div>



    
    <div class="playingNow" v-if="showingPage === 'playingNow'">
      <div class="view-counter" style="right:0; text-align:right;  margin-left: 0px; margin-bottom:10px; margin-top: -30px">
            Room No. {{actualRoom.roomNumber}}
      </div>
      <!-- <h1>{{theRoom.status}}</h1> -->
      <h1>Host: {{actualRoom.hostName}}</h1>
      <h1>Status{{actualRoom.status}}</h1>
      
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
    

    </div>
      

  </body>
  
</template>

<script>

import db from "./firebase.js"
import Vue3autocounter from 'vue3-autocounter';
import { defineComponent } from 'vue';

export default defineComponent({ 
  name: 'App',
  components: {
    'vue3-autocounter': Vue3autocounter
  },

  data(){
    return{
      testing: true,
      TableList: [],
      prgoressList:[],
      RedItemList:[],
      BlueItemList:[],
      roomData: [],
      availableRooms: [],
      theRoom: undefined,
      waitingRoom: undefined,
      actualRoom: undefined,

      currentColor: undefined,
      currentNum: undefined,

      isItBingo: [],

      whoGotBingo: undefined,

      fireData:[],
      userNum: 0,

      showingPage: 'register',
      userName: undefined,

      needPassword: false,

      currentPassword: undefined,

      isItAvailable: false,
      playerRole: undefined,

      theNumber: undefined,

      cutTheFirstData: false,

      // playerShowedUp: false,


    }
  },

  mounted(){

    this.currentColor = 'blue'

    db.collection("user-counter")
    .get()
    .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
        //  console.log(`${doc.id} => ${doc.data().TotalNum}`)
         this.fireData.push(doc.data().TotalNum)
         this.userNum = doc.data().TotalNum + 1
       })
    })

    


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

    // this.getRoomData()
    this.keepReciving()
    
  
  },

  created(){

    if(this.testing){
      this.showingPage = 'choice' 
      this.userName = 'Nozo'
      // this.isItAvailable = true

      

      

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

    register(){
      if(!this.userName){
        alert('Type your userName')
        return
      }

      if(this.userName.length > 10){
        alert("The username is too long")
        return 
      }

      this.showingPage = 'choice'
    },

    createRoom(){
      if(this.userNum == 0){
        return;
      }
      if(this.needPassword){
        if(!this.currentPassword){
           alert('Type Password')
          return
        }
        if(this.currentPassword.length > 10){
          alert("This password is too long")
          return 
        }
      }

      let r= confirm(`Are you ready to create a room?`);
      if(!r){
        // this.movingRobber = false;
        return;
      }

      console.log('sending data')
        const ref = db.collection('game-data')
        ref.doc('gameNo.'+ this.userNum).set({
          // TotalNum: this.userNum 
          hostName: this.userName,
          joinedplayer: '',
          createdTime: Date.now(),
          password: this.needPassword,
          status: 'waiting',
          roomNumber: this.userNum,
          guestID: '',
          rejected: '',


        })
      // console.log('Sent data now')

      // this.showingPage = 'waiting'
      this.playerRole = 'host'
      
      // this.theRoom.isItOpen = true

    },

    joinRoom(num){
      this.waitingRoom = this.availableRooms[num]
      // in  case of password 

      let r= confirm(`You wanna join ${this.waitingRoom.hostName}'s room? `);
        if(!r){
            return;
        }

      if(this.waitingRoom.password){
        alert('type the shit')
      }
      


      const ref = db.collection('game-data')
      ref.doc('gameNo.'+ this.waitingRoom.roomNumber).update({
        joinedplayer: this.userName,
        guestID: this.userNum,
        
      })
      // this.ReciveTheData() 

      this.waitingForConfirmation = true

      this.playerRole = 'guest'
 
      this.showingPage = 'waiting'
    },


    keepReciving(){
      db.collection('game-data').onSnapshot(snap => {
        if(this.cutTheFirstData){
          return
        }
        // if(this.playerRole == 'guest'){
        //   console.log('yo called me')
        //   return
        // }
        // let foo = [];
      this.roomData = []
      snap.forEach(doc => {
      this.roomData.push(doc.data())
       });
      })
      // console.log('new updete incomign')
		},

    ReciveTheData(){
      console.log('finally')

      db.collection('game-data').onSnapshot(snap => {
      snap.forEach(doc => {
        // this.waitingRoom.status = ''

        if(this.playerRole == 'host' && doc.data().roomNumber == this.userNum){
          this.theRoom =doc.data()
          this.actualRoom = this.theRoom
          // console.log(this.theRoom)
        }else if(this.playerRole == 'guest' && doc.data().guestID == this.userNum){
          console.log('found it')
          this.waitingRoom =doc.data()
          this.actualRoom = this.waitingRoom
          // this.waitingRoom.status =doc.data().status
          // console.log(this.waitingRoom)
        }

        if(this.playerRole == 'host'){
          const ref = db.collection('game-data')
          ref.doc('gameNo.'+ this.theRoom.roomNumber).update({
            status: 'playingNow',
            
          }) 
        }

        this.showingPage = 'playingNow'
        // console.log(this.theRoom.status)

        if(this.playerRole == 'guest' && this.waitingRoom.status == 'playingNow'){
          this.showingPage = 'playingNow'
        }
        // console.log(this.theRoom)
      });
      })
        // console.log('new updete incomign')
        

        
    },

    getTheTime(){

    },

    getRoomData(){
      this.roomData = []
      console.log('refreshing room data')
      db.collection("game-data")
      .get()
      .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          this.roomData = []
          this.roomData.push(doc.data())
          
        })
      })
      
    },

    choice(flag){
      if(flag){
        console.log('success')
        const ref = db.collection('game-data')
        ref.doc('gameNo.'+ this.theRoom.roomNumber).update({
          // joinedplayer: this.userName
          status: 'playingNow'
          
        })
        console.log('menow')
        this.ReciveTheData()
        this.showingPage = 'playing'
      }else{
        const ref = db.collection('game-data')
        ref.doc('gameNo.'+ this.theRoom.roomNumber).update({
          joinedplayer: '',
          rejectedID: this.theRoom.guestID,
          
          
        })
        
        this.showingPage = 'waiting'
      }
    },

    cancel(){
      if(this.playerRole == 'guest'){
        let r= confirm(`You wanna cancel this?`);
        if(!r){
            // this.movingRobber = false;
            return;
        }
        const ref = db.collection('game-data')
        ref.doc('gameNo.'+ this.waitingRoom.roomNumber).update({
          // joinedplayer: this.userName
          joinedplayer: ''



          
        })

        this.showingPage = 'choice'


        
      }
    },

    // ----------------------------
    getDifferenceInSeconds(time1) {
      const diffInSs = Math.abs(time1 - Date.now());
      // const diffInSs = Math.abs(Date.now() - time1);

      // console.log(Date.now())
      
      
      return( diffInSs / 1000)
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
    userNum(){
      console.log('just ogt data')
        const ref = db.collection('user-counter')
        ref.doc('zTxcxzwkcKhxexZdD0Uf').update({
          TotalNum: this.userNum 
        })
      // console.log('Sent data now')
    },
    currentPassword(){
      if(this.currentPassword[this.currentPassword.length -1] === ' '){
        this.currentPassword = this.currentPassword.slice(0, -1)
      }
    },
    roomData: {
      deep:true,
      handler() {
        let i = 0
        this.availableRooms = []
        let limitTime = 600
        // limitTime = 60
        
        while(i < this.roomData.length){

          // if(this.playerRole == 'guest'){
          //   return
          // }
          
          if(this.roomData[i].status == 'waiting' ){
            // console.log('jsut now')
            let theTime = this.getDifferenceInSeconds(this.roomData[i].createdTime)
            if(theTime < limitTime){
              let theColor = ''
              this.availableRooms.push(this.roomData[i])
              theTime = theTime.toString()
              theTime = theTime.split('.')[0]
              theTime = parseInt(theTime)

              theTime = limitTime - theTime

              let minutes = Math.floor(theTime / 60);

              let seconds = theTime - minutes * 60;

              if(seconds < 10){
                seconds = parseInt(seconds)
                seconds = '0'+ seconds
              }

              if(minutes !== 0){
                theTime = minutes+ ':' +seconds
              }else{
                theTime = '0' + ':' +seconds
                theColor = 'red'
              }


              this.availableRooms[this.availableRooms.length -1].timeLeft = theTime
              this.availableRooms[this.availableRooms.length -1].color = theColor
             

             
            }
          } 
          // if(this.availableRooms.length !== 0){
            if(this.availableRooms.length !== 0){
            

            let theNumbers = this.availableRooms.length -1 
            // console.log(this.availableRooms)
            if(this.availableRooms[theNumbers].roomNumber == this.userNum){
              this.theNumber = theNumbers
              this.theRoom = this.availableRooms[theNumbers]
              this.showingPage = 'waiting'


  
              if(this.theRoom.joinedplayer !== '' && this.playerRole == 'host'){
                
                this.showingPage = 'confirmation'
              }
              
            }
            


            
          }
          // -------------- FOR THE GUeST -----------

          let count = 0
            if(this.playerRole == 'guest'){
              // console.log('reached here')
              while(count< this.roomData.length){
                if(this.roomData[count].guestID == this.userNum){
                  this.waitingRoom = this.roomData[count]
                  console.log(this.waitingRoom.status)
                  // console.log('finally got it!')
                }
                count++
              }
            }



            if(this.playerRole == 'guest' && this.waitingRoom){ 
              // console.log(this.waitingRoom)
              if(this.waitingRoom.status == 'playingNow'){
                console.log('lets go')
                this.showingPage = 'playingNow'
                this.cutTheFirstData = true
                this.ReciveTheData()
              }


              // PO rejected
              if(this.waitingRoom.rejectedID == this.userNum ){
                // console.log('gor rejeceted')
                const ref = db.collection('game-data')
                ref.doc('gameNo.'+ this.theRoom.roomNumber).update({
                  rejected: '',
                  
                })   
                this.showingPage = 'waiting'     
              }
            }

          
          i++
        }
      }
    },
    waitingRoom(){
      // console.log(this.waitingRoom)
      console.log('getting updateds')
    },

    actualRoom(){
      // console.log(this.actualRoom)
    }


    
   },
})
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

.teamName{
  font-size: 125%;
}

.display span small{
  margin-right: 12.5px;
  font-size: 250%;
}


/* ------------------ */

#login-box {
  
  /* position: relative;
  margin: 5% auto;
  width: 600px;
  height: 400px;
  background: #FFF;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); */
}

.LEFT {
  margin-top: 75px;
  padding: 15px;
  text-align: center;
  
}


h1 {
  margin: 0 0 20px 0;
  font-weight: 300;
  font-size: 28px;
}

input[type="text"],
input[type="number"]{
  /* display: block; */
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 4px;
  width: 220px;
  height: 32px;
  border: none;
  border-bottom: 1px solid #AAA;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 15px;
  transition: 0.2s ease;
}

input[type="submit"] {
  margin-top: 28px;
  width: 120px;
  height: 32px;
  border: none;
  border-radius: 2px;
  color: #FFF;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
}


/* ------------------------------- */


.rtable {
  /*!
  // IE needs inline-block to position scrolling shadows otherwise use:
  // display: block;
  // max-width: min-content;
  */
  display: inline-block;
  vertical-align: top;
  max-width: 100%;
  
  overflow-x: auto;
  
  /* optional - looks better for small cell values */
  white-space: nowrap;

  border-collapse: collapse;
  border-spacing: 0;
  font-size: 95%;
}

.rtable,
.rtable--flip tbody {
   /* optional - enable iOS momentum scrolling */
  -webkit-overflow-scrolling: touch;
  
/* scrolling shadows */
  background: radial-gradient(left, ellipse, rgba(0,0,0, .2) 0%, rgba(0,0,0, 0) 75%) 0 center,
              radial-gradient(right, ellipse, rgba(0,0,0, .2) 0%, rgba(0,0,0, 0) 75%) 100% center;
  background-size: 10px 100%, 10px 100%;
  background-attachment: scroll, scroll;
  background-repeat: no-repeat;
}

/* change these gradients from white to your background colour if it differs */
/* // gradient on the first cells to hide the left shadow */
.rtable td:first-child,
.rtable--flip tbody tr:first-child {
  background-image: linear-gradient(to right, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
  background-repeat: no-repeat;
  background-size: 20px 100%;
}

/* // gradient on the last cells to hide the right shadow */
.rtable td:last-child,
.rtable--flip tbody tr:last-child {
  background-image: linear-gradient(to left, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
  background-repeat: no-repeat;
  background-position: 100% 0;
  background-size: 20px 100%;
}

.rtable th {
  font-size: 11px;
  background: #f2f0e6;
}

.rtable th,
.rtable td {
  padding: 6px 12px;
  border: 1px solid #d9d7ce;
}

body {
  /* margin: 0;
  padding: 25px;
  color: #494b4d;
  font-size: 14px;
  line-height: 20px; */
}

h1, h2, h3 {
  margin: 0 0 10px 0;
  /* color: #1d97bf; */
}

h1 {
  font-size: 25px;
  line-height: 30px;
}

h2 {
  font-size: 20px;
  line-height: 25px;
}

h3 {
  font-size: 16px;
  line-height: 20px;
}

table {
  margin-bottom: 30px;
}

code {
  background: #fffbcc;
  font-size: 12px;
}

/* -------------------------------------------------------- */
table .button1 {
  background-color: darkblue; /* Green */
  border: none;
  color: white;
  padding: 2px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 3px;
}

.button2{
  background-color: #e15b64;
  border: none;
  color: white;
  padding: 2px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 3px;
}

.button3{
  background-color: #16a085;
  border: none;
  color: white;
  padding: 10% 16%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 150%;
  margin: 2px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 15px;
  margin-top: 15px;
  margin-right: 15px;
}

.button4{
  background-color: #e15b64;
  border: none;
  color: white;
  padding: 10% 16%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 150%;
  margin: 2px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 3px;
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

import Web3 from "web3";
import SupplyChain from "../../build/contracts/SupplyChain.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChain.networks[networkId];
      this.meta = new web3.eth.Contract(
        SupplyChain.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  harvestItem: async function() {
    console.log("test call1");
    const { harvestItem } = this.meta.methods;
    const upc = document.getElementById("upc").value;
    const originFarmerID = document.getElementById("originFarmerID").value;
    const originFarmName = document.getElementById("originFarmName").value;
    const originFarmInformation = document.getElementById("originFarmInformation").value;
    const originFarmLatitude = document.getElementById("originFarmLatitude").value;
    const originFarmLongitude = document.getElementById("originFarmLongitude").value;
    const productNotes = document.getElementById("productNotes").value;
    console.log(document.getElementById("productNotes").value);
    console.log(productNotes);
    this.meta.methods.harvestItem(upc, originFarmerID,originFarmName,originFarmInformation,originFarmLatitude,originFarmLongitude,productNotes).call();
    App.setStatus("New Star Owner is " + this.account + ".");
  },
  
  
  // Implement Task 4 Modify the front end of the DAPP
  ItemBufferTwo: async function (){
    console.log("test call2");
    var id = document.getElementById("fetch_upc").value;

   
    var buffer = await this.meta.methods.fetchItemBufferTwo(id).call();
    var {0: variable_1,1: variable_2,2: variable_3,3: variable_4,4: variable_5,5: variable_6,6: variable_7,7: variable_8,8: variable_9} = buffer;
    console.log(buffer,variable_5," ",variable_6," ",variable_7," ",variable_8," ",variable_9);
    //console.log(id, " ",buffer," ", buffer.itemState, "  ",buffer.productNotes);
    //App.setStatus("The Item state is :  " + buffer);
    console.log("test call3");
    }

};

window.App = App;

window.addEventListener("load", async function() {
  /*if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }*/
  App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  App.start();
});
let url="https://latest.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("form .msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && currCode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
        
    }
    select.addEventListener("change",(el)=>{
        updateFlag(el.target);
    })
}

const updateFlag=(el)=>{
    let currCode=el.value;
    let counrty=countryList[currCode];
    let newSrc=`https://flagsapi.com/${counrty}/flat/64.png`;
    let img=el.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (el)=>{
    el.preventDefault();
    let amount = document.querySelector(".amount input");
    // console.log(amount.value);
    if(amount.value==="" || amount.value<0){
        msg.innerHTML=`Enter A Valid Amount`;
        return;
    }
    // console.log(fromCurr.value,toCurr.value);
    let fromvalue= fromCurr.value.toLowerCase();
    let tovalue= toCurr.value.toLowerCase();
    let res=await fetch(url);
    let data = await res.json();
    // console.log(data.eur[tovalue]); 
    let toans=data.eur[tovalue];
    let fromans=data.eur[fromvalue];
    let ans=(toans/fromans);
    // console.log(fromans,toans,ans);
    msg.innerHTML=`${amount.value} ${fromCurr.value} = ${(ans*(amount.value)).toFixed(3)} ${toCurr.value}`;
});


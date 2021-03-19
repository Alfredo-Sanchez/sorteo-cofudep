
const navList = document.getElementById('navList')


fetch('http://localhost:3000/getwinners')
.then(res => {
    if(res.ok){
        return res.json()
    }
})
.then(  data => {
    // console.log(data)
    if(!data.hasOwnProperty('message')){
        const fragment = document.createDocumentFragment();
        for(const winInfo of data ){
            const newElement = document.createElement('LI')
              newElement.textContent = `${winInfo.part_orden} - ${winInfo.soc_nombre}: ${winInfo.soc_gan_desc}.-`;
            fragment.append(newElement)  
        }
        navList.append(fragment)
       
    }
})
.catch(e => {
    console.log(e)
})


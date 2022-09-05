window.addEventListener("load", async ()=>
{
    init_ContractOptions();
    
    // aaa.src = "https://uc.udn.com.tw/photo/2021/07/29/1/13149926.png"
});

//初始化 合約及商品Metadata選項
function init_ContractOptions() {
    document.getElementById("flexCheckDefault").addEventListener("change", ()=>{
        let constractCheckBox = document.getElementById("ContractMetadata");
        if(constractCheckBox.style.display == "")
            constractCheckBox.style.display = "block"
        else
            constractCheckBox.style.display = constractCheckBox.style.display == "none" ? 'block' : 'none';
    }
    );

    document.getElementById("flexCheckChecked").addEventListener("change", ()=>{
        let constractCheckBox = document.getElementById("ItemMetadata");
        if(constractCheckBox.style.display == "")
            constractCheckBox.style.display = "block"
        else
            constractCheckBox.style.display = constractCheckBox.style.display == "none" ? 'block' : 'none';
    }
    );
}



/* ====Contract Metadata==== */


/*====Item MetaData====*/

//刷新商品Metadata列表
function RefreshItemTable() {
    
    var ItemTable = document.getElementById('ItemTable');
    ItemTable.innerHTML = "";
    for(var i = 0; i < ItemMetadatas.length; i++)
    {
        ItemTable.innerHTML += 
        `
        <tr>
            <th scope="row">${ItemMetadatas[i].id}</th>
            <td>${ItemMetadatas[i].name}</td>
            <td>${ItemMetadatas[i].description}</td>
            <td><img src="${ItemMetadatas[i].image}" height="50 px" alt="" onerror= "Toast('ERROR', '無效的圖片網址')"></td>
            <td><video src="${ItemMetadatas[i].animation_url}" controls autoplay height="0 px" onerror= "Toast('ERROR', '無效的影片網址')"></video></td>
            <td>${ItemMetadatas[i].attributes}</td>
        </tr>
        `;
    }
}

//新增商品屬性列表
var AttributesTableId = 0;
var AttributesTableCount = [];
function OnAddAttributesTable() {
    var AttributesTable = document.getElementById('AttributesTable');
    AttributesTableId++;
    AttributesTableCount.push(AttributesTableId);
    AttributesTable.innerHTML += 
    `
    <tr id="AttributesTable_${AttributesTableId}">
        <th><input id="AttributesTable_trait_type${AttributesTableId}" type="text"></th>
        <td><input id="AttributesTable_value${AttributesTableId}" type="text"></td>
        <td><button class="btn btn-danger" onclick="OnRemoveAttributesButton(AttributesTable_${AttributesTableId})">X</button></button></td>
    </tr>
    `;
    console.log("[Add Attributes]:", `index= ${AttributesTableCount.length -1}`);
}

var ItemMetadatas = [];
function AddItemMetadata(id, name, description, image, animation_url, attributes) {
    let _itemMetadata = {"id" : id, "name" : name, "description" : description, "image" : image, "animation_url": animation_url, "attributes" : attributes}
    ItemMetadatas.push(_itemMetadata);
}

function _createAttributes(traitType, value) {
    if(traitType.length != value.length)
    {
        console.error("Length not Equal!");
        return;
    }

    let Attributes = "[";
    for(var i = 0; i < traitType.length; i++)
    {
        Attributes +=
        `
        {
            "trait_type" : ${traitType[i]},
            "value" : ${value[i]}
        },`;
    }
    Attributes += "\n]"
    return Attributes;
}

function OnRemoveAttributesButton(id) {
    let index = AttributesTableCount.indexOf(parseInt(id.id.split('_')[1] ));
    console.log("[Remove Attributes]:", index);
    AttributesTableCount.splice(index, 1);
    id.remove();
}

/*====Other==== */

//圖片或影片連結預覽按鈕
function OnImgOrVideoPreviewButton(imgInput_Id, img_Id, height_Size) {
    let contractImg = document.getElementById(img_Id);
    contractImg.src = document.getElementById(imgInput_Id).value;
    contractImg.height = height_Size == void(0) ? 50 : height_Size;
    contractImg.addEventListener('error', ()=>
    {
        contractImg.height = 0;
    });
}

//吐司提示訊息
function Toast(title, msg) {
    var toastLiveExample = document.getElementById('liveToast')
    document.getElementById('liveToast_Title').innerText = title;
    document.getElementById('liveToast_Message').innerText = msg;
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
}


function OnAddItemMetadata(params) {
    let ItemId = document.getElementById('ItemId');
    let ItemName = document.getElementById('ItemName');
    let ItemDescritpion = document.getElementById('ItemDescritpion')
    let ItemImage = document.getElementById('ItemImgInput');
    let ItemVideo = document.getElementById('ItemVideoInput');
    let ItemAttributes = _getAttributes();

    AddItemMetadata(ItemId.value, ItemName.value, ItemDescritpion.value, ItemImage.value, ItemVideo.value, ItemAttributes);
    RefreshItemTable();
    ItemId.value = "";
    ItemName.value = "";
    ItemDescritpion.value = "";
    ItemImage.value = "";
    ItemVido.value = "";
    ItemAttributes = "";
    let aaa = AttributesTableCount.slice(0) 
    for (let i = 0; i < aaa.length; i++) {
        console.log(aaa[i]);
        OnRemoveAttributesButton(document.getElementById(`AttributesTable_${aaa[i]}`));
    }
    
}



function OnAddItemTable() {
    for(let i = 0; i < 5; i++)
    {
        AddItemMetadata(i, `n${i}`, `d${i}`, `img${i}`, `anim${i}`, _createAttributes([`A${i}`, `B${i}`], [`aaa${i}`, `bbb${i}`]));
    }
    RefreshItemTable();
}

function _getAttributes() {
    let Attributes = "";
    for (let i = 0; i < AttributesTableCount.length; i++) {
        let AttributesTable_trait_type = document.getElementById(`AttributesTable_trait_type${AttributesTableCount[i]}`);
        let AttributesTable_value = document.getElementById(`AttributesTable_value${AttributesTableCount[i]}`);
        Attributes += 
        `{ "trait_type" : "${AttributesTable_trait_type.value}", "value" : "${AttributesTable_value.value}" },`;
    }
    return Attributes;
}


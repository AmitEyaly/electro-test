console.log("hello script");

const title= document.getElementById('title') ;
const content= document.getElementById('content') ;
const submitBtn= document.getElementById('submitBtn') ;

if (!title || !content || !submitBtn) {
    throw new Error('Required elements are missing in the HTML');
}

submitBtn.addEventListener('click', () => {
    const titleValue = title.value;
    console.log(titleValue);
    const contentValue = content.value;
    console.log(contentValue);
    
    if (titleValue && contentValue) {
        console.log(titleValue, contentValue);
        
}
});

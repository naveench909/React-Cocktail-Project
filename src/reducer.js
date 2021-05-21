const reducer = (state , action)=>{
    if(action.type === "DISPLAY_ITEM"){
        return{
            ...state,
            list:action.payload
        }
    }

    throw new Error("something went wrong!!!")
}

export default reducer;
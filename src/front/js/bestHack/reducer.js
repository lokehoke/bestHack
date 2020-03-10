const reducer = (state = 0, action) => {

    switch (action.type) {
     case 'INC':
       return state + 1;
     case 'DEC':
       return state - 1; 
     case 'RND':
       return state + action.payload;// + Math.floor(Math.random()*10); - мы не можем это писать здесь, 
     default:                        // т.к. reducer должна быть чистой функцией   
       return state;
    } 
     return 0;
   };
        

export default reducer;
const convertDate = (date) => {
  
  if(Math.floor(date / 31556952000) > 0){
    if(Math.floor(date / 31556952000) === 1){
      return ' 1 year';
    } else{
      return Math.floor(date / 31556952000) + ' years';
    }
  } else if(Math.floor(date / 2592000000)	 > 0){
    if(Math.floor(date / 2592000000) === 1){
      return ' 1 month';
    } else{
      return Math.floor(date / 2592000000) + ' months';
    }
  } else if(Math.floor(date / 86400000) > 0){
    if(Math.floor(date / 86400000) === 1){
      return ' 1 day';
    } else{
      return Math.floor(date / 86400000) + ' days';
    }
  } else if(Math.floor(date / 3600000) > 0){
    if(Math.floor(date / 3600000) === 1){
      return ' an hour';
    } else{
      return Math.floor(date / 3600000) + ' hours';
    }
  } else if(Math.floor(date / 60000) > 0){
    if(Math.floor(date / 60000) === 1){
      return ' a minute';
    } else{
      return Math.floor(date / 60000) + ' minutes';
    }
  } else{
    if(Math.floor(date / 1000) === 1){
      return ' a second';
    } else{
      return Math.floor(date / 1000) + ' seconds';
    }
  }
  
}

module.exports = { convertDate };
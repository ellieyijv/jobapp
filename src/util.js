

export  function getRedirectPath({type, avatar}) {
   /* user.type /boss /seekerinfo
    user.avatar /bossinfo /seekerinfo*/
   let url = (type === 'boss')? '/boss' : '/seeker'
    console.log(type)
    if(!avatar){
        url += 'info'
    }
    return url
}

export function getChatId(userId, targetId){
    return [userId, targetId].sort().join('_')
}
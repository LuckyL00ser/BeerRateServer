const permissions =  {
    consumer:['add beer','update self beer','add opinion','update self opinion','remove self opinion'],
    breweryOwner: ['add beer','update self beer','add opinion','update self opinion','remove self opinion','add brewery','remove self brewery','update self brewery'],
    admin: ['add beer','remove beer','update beer','add brewery','remove brewery','update brewery','add opinion','remove opinion']
}
function isUserPermitted(user,object,objectType){
    return {
        canRead: canRead(user,object,objectType),
        canEdit: canEdit(user,object,objectType),
        canAdd: canAdd(user,objectType),
        canRemove: canRemove(user,object,objectType),
    }
}
function canAdd(user,objectName){
    if(!user.userRole)
        return false
    if(permissions[user.userRole].includes(`add ${objectName}`))
        return true
}
function canRead(user,object,objectName){
    return true;
}
function canEdit(user,object,objectName){
    if(!user.userRole)
        return false
    if(permissions[user.userRole].includes(`update ${objectName}`))
        return true
    if(permissions[user.userRole].includes(`update self ${objectName}`) && user._id == object.user)
        return true
}
function canRemove(user,object,objectName){
    if(!user.userRole)
        return false
    if(permissions[user.userRole].includes(`remove ${objectName}`))
        return true
    if(permissions[user.userRole].includes(`remove self ${objectName}`) && user._id == object.user)
        return true
}
export default  {permissions, isUserPermitted, canRead,canAdd,canEdit,canRemove}

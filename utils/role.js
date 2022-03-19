export const ROLE_NAME = {
    Warrior: '骑士',
    Rogue: '猎人',
    Mage: '法师',
    Ranger: '刺客',
}

export const getAllProps = (props) => {
    let result = 0;
    Object.keys(props).forEach((key) => {
        result += props[key];
    });
    return result;
};

export const jugeIsGreat = (prop, type) => {
    switch (type) {
        case ROLE_NAME.Warrior:
            return prop.strength > 85 && prop.stamina > 60;
        case ROLE_NAME.Ranger:
            return prop.agility > 85 && prop.strength > 60;
        case ROLE_NAME.Mage:
            return prop.intelligence > 85 && prop.mind > 60;
        case ROLE_NAME.Rogue:
            return prop.strength > 85 && prop.agility > 60;
        default:
            return false;
    }
};

export const getRoleMainProp = (attrs, type) => {
    switch (type) {
        case '骑士':
            return attrs.strength;
        case '刺客':
            return attrs.agility;
        case '法师':
            return attrs.intelligence;
        case '猎人':
            return attrs.strength;
        default:
            return 0;
    }
};
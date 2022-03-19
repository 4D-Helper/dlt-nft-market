import { Hero } from "../types";

export const RoleMap = {
    0: '骑士',
    1: '法师',
    2: '猎人',
    3: '刺客'
  }

export const ROLE_NAME = {
    Warrior: '骑士',
    Rogue: '猎人',
    Mage: '法师',
    Ranger: '刺客',
}

export const getAllProps = (props: Record<string, number>) => {
    let result = 0;
    Object.keys(props).forEach((key) => {
        result += props[key];
    });
    return result;
};

export const jugeIsGreat = (prop: Hero, type) => {
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

export const getRoleMainProp = (attrs: Hero, type: string) => {
    switch (type) {
        case ROLE_NAME.Warrior:
            return attrs.strength;
        case ROLE_NAME.Ranger:
            return attrs.agility;
        case ROLE_NAME.Mage:
            return attrs.intelligence;
        case ROLE_NAME.Rogue:
            return attrs.strength;
        default:
            return 0;
    }
};

export const judgeMainProp = (propName: string, role: string) => {
    switch (role) {
        case ROLE_NAME.Warrior:
            return propName === 'strength';
        case ROLE_NAME.Ranger:
            return propName === 'agility';
        case ROLE_NAME.Mage:
            return propName === 'intelligence';
        case ROLE_NAME.Rogue:
            return propName === 'strength';
        default:
            return false;
    }
}

export const judgeSubProp = (propName: string, role: string) => {
    switch (role) {
        case ROLE_NAME.Warrior:
            return propName === 'stamina';
        case ROLE_NAME.Ranger:
            return propName === 'strength';
        case ROLE_NAME.Mage:
            return propName === 'mind';
        case ROLE_NAME.Rogue:
            return propName === 'agility';
        default:
            return false;
    }
}

export const getRolePropText = (props: Hero, propName) => {
    const role = RoleMap[props.occupation];
    const isMainProp = judgeMainProp(propName, role);
    const isSubProp = judgeSubProp(propName, role);
    return isMainProp ? props[propName] + "(主)" : isSubProp ? props[propName] + "(副)" : props[propName];
}
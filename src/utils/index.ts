const filterUndefined = (orgArray: any[]): any[] => {
    const dstcArr: any[] = [...new Set(orgArray)];
    for (let i = 0; i < dstcArr.length; i++) {
        if (dstcArr[i] == undefined) {
            dstcArr.splice(i, 1);
        }
    }
    return dstcArr;
};

const isInternetExplorer = (): boolean => {
    const userAgent: string = window.navigator.userAgent;
    if (userAgent.indexOf('MSIE') >= 0 || 'ActiveXObject' in window) {
        return true;
    }
    return false;
};

const isIpAdress = (adress: string): boolean => {
    const regx = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    return regx.test(adress);
};

const createNumberRange = (start: number, end: number): number[] => {
    const range: number[] = [];
    for (let i = start; i < end; i++) {
        range.push(i);
    }
    return range;
};

const sumNumArray = (array: string[] | number[], initValue = 0): number => {
    try {
        const formatArray = array.map((item: number | string): number => Number(item));
        if (formatArray.includes(NaN)) {
            throw new Error('the array contains NaN!');
        }
        return formatArray.reduce((pre: number, cur: number): number => pre + cur, initValue);
    } catch (err: unknown) {
        console.error(err);
        return NaN;
    }
};

const convertRoma = (num: number): string => {
    const presetNumberArray: number[] = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    const presetRomaArray: string[] = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
    let formatRoma = '';
    if (num > 0) {
        let index = presetNumberArray.length;
        while (index >= 0) {
            if (num >= presetNumberArray[index]) {
                num -= presetNumberArray[index];
                formatRoma += presetRomaArray[index];
            } else {
                index--;
            }
        }
    }
    return formatRoma;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortObjectArray = (attribute: string, order: 'asc' | 'desc' = 'asc'): ((object1: any, object2: any) => number) => {
    return function (object1, object2) {
        let compareVal1 = object1[attribute];
        let compareVal2 = object2[attribute];
        if (order === 'desc') {
            compareVal1 = object2[attribute];
            compareVal2 = object1[attribute];
        }
        if (compareVal2 < compareVal1) {
            return 1;
        } else if (compareVal2 > compareVal1) {
            return -1;
        } else {
            return 0;
        }
    };
};

const hexify = (color: string) => {
    let values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',');
    let a = parseFloat(values[3] || '1'),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return '#' + ('0' + r.toString(16)).slice(-2) + ('0' + g.toString(16)).slice(-2) + ('0' + b.toString(16)).slice(-2);
};

export { isInternetExplorer, isIpAdress, filterUndefined, createNumberRange, sumNumArray, convertRoma, sortObjectArray, hexify };

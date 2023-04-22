const getBorders = (pattern) => {
    const borders = [];

    for (var k = 0; k < pattern.length; k++)
    {
        borders.push(k == 0? 0 : -1);
    }

    var j = 0;
    var i = 1;

    while (i < borders.length)
    {
        if (pattern[j] === pattern[i])
        {
            borders[i] = j + 1;
            i++;
            j++;
        }

        else if (j > 0)
        {
            j = borders[j-1];
        }

        else
        {
            borders[i] = 0;
            i++;
        }
    }

    return borders;

}

const KMP = (text, pattern) => {

    const borders = getBorders(pattern);

    var i = 0;
    var j = 0;

    while(i < text.length)
    {
        if (pattern[j] === text[i])
        {
            if (j === pattern.length - 1) return i - pattern.length + 1;

            i++;
            j++;
        }

        else if (j > 0)
        {
            j = borders[j-1];
        }

        else
        {
            i++;
        }
    }

    return -1;

}

export default KMP;
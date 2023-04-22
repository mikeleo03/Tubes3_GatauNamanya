const LCSrecursion = (firstText, secondText, i, j, memo) => {

    if (memo[i][j] !== -1) return memo[i][j];

    if (firstText[i-1] === secondText[j-1]) memo[i][j] = 1 + LCSrecursion(firstText, secondText, i-1, j-1, memo);
    else memo[i][j] = Math.max(LCSrecursion(firstText, secondText, i-1, j, memo), LCSrecursion(firstText, secondText, i, j-1, memo));

    return memo[i][j];
}

const LCS = (firstText, secondText) => {

    const memo = [];

    for (var i = 0; i <= firstText.length; i++)
    {
        memo.push([]);

        for (var j = 0; j <= secondText.length; j++)
        {
            memo[i].push(i === 0 || j === 0? 0 : -1);
        } 
    }

    return LCSrecursion(firstText, secondText, firstText.length, secondText.length, memo);
}

export default LCS;
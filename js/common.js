function getLangFromPath() {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[1]; // 假设语言代码总是在第一个路径段
}

function returnAdvWord(){
    return `<p style="text-align: center;text-align: center; line-height: 100px; margin: 0;width: 100%">Advertisment</p>`
}

function returnAdvTestWord(){
    return `<p style="text-align: center;text-align: center; line-height: 100px; margin: 0;width: 100%">ADV Test</p>`
}

function isMobile() {
    return window.matchMedia("only screen and (max-width: 768px)").matches;
}

function generateScoreHTML(score) {
    const fullStars = Math.floor(score);          // 整星数量
    const halfStar = score % 1 >= 0.5 ? 1 : 0;    // 半星数量
    const emptyStars = 5 - fullStars - halfStar;  // 空星数量（如果你想加空星的话）

    let html = `<div class="appCardInfoScore">\n`;

    // 加满星
    for (let i = 0; i < fullStars; i++) {
        html += `  <svg width="12" height="12"><use xlink:href="#icon-start"></use></svg>\n`;
    }

    // 加半星
    if (halfStar) {
        html += `  <svg width="12" height="12"><use xlink:href="#HalfStar"></use></svg>\n`;
    }

    // 如果需要加空星（可选）
    for (let i = 0; i < emptyStars; i++) {
        html += `  <svg width="12" height="12"><use xlink:href="#EmptyStar"></use></svg>\n`;
    }

    // 数字评分
    html += `  <span class="scoreNum">${score.toFixed(1)}</span>\n`;
    html += `</div>`;

    return html;
}
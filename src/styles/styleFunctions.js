export const getPercentColor = (percent) => {
    const percentNum = parseInt(percent);
    let color;
    if (percentNum >= 95) {
        color = '#E74C3C';
    } else if (percentNum >= 80) {
        color = '#F5B041';
    } else if (percentNum >= 60) {
        color = '#F4D03F';
    } else if (percentNum >= 40) {
        color = '#58D68D';
    } else {
        color = '#52BE80';
    }
    return color;
}
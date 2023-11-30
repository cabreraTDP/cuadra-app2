function Stats({title, value, colorIndex, background}){

    const COLORS = ["primary", "primary"]

    const BACKGROUNDCOLORS = {"red":"rgba(255, 105, 97,0.25)", "green":"rgba(119, 221, 119,0.25)", "gray":"rgba(130, 130, 130,0.25)"}
    return(
        <div className="shadow" style={{"backgroundColor": `${BACKGROUNDCOLORS[background]}`}}>
            <div className="stat">
                <div className="stat-title dark:text-slate-300">{title}</div>
                <div className={`stat-value dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{value}</div>
            </div>
        </div>
    )
}

export default Stats
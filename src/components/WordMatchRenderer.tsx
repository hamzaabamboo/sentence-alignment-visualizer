import { Fragment, useEffect, useMemo } from "react";

function rand(min, max) {
    return min + Math.random() * (max - min);
}

function getRandomColor() {
    var h = rand(1, 360);
    var s = rand(100, 100);
    var l = rand(30, 60);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

export const WordMatchRenderer = (props: { english: string, japanese: string, align: string}) => {
    const {english, japanese, align} = props;
    const words = english.split(" ");
    const jwords = japanese.split(" ");
    const alignPairs = align.split(" ");
    const colors = useMemo(() => alignPairs.map(a => getRandomColor()), [alignPairs])

    useEffect(() => {
        const textLength = english.length;
        const charsPerLine = 80;
        const newEmSize = charsPerLine / textLength;
        const textBaseSize = 13;
   
        document.getElementById("eng-text")?.setAttribute("font-size",  (newEmSize > 1 ? textBaseSize : newEmSize * textBaseSize) +"px");
    }, [english])

    useEffect(() => {
        const textLength = japanese.length;
        const charsPerLine = 50;
        const newEmSize = charsPerLine / textLength;
        const textBaseSize = 13;
   
        document.getElementById("jp-text")?.setAttribute("font-size",  (newEmSize > 1 ? textBaseSize : newEmSize * textBaseSize) +"px");
        
    }, [japanese])

    useEffect(() => {
        alignPairs.forEach((l, idx) => {
            const [ja, en] = l.split("-")
            //line positions
            const eng = document.getElementById("eng-" + en) as unknown as  SVGTextElement;
            const jpa = document.getElementById("ja-" + ja) as unknown as  SVGTextElement;
            const start = jpa?.getBBox?.() ;
            const end = eng?.getBBox?.() ;
            const line = document.getElementById("line-" + idx) ;
           if (start && end) {
                line?.setAttribute('x1',start?.x + (start?.width / 2) +"")
                line?.setAttribute('x2',end?.x + (end?.width / 2) +"")
                line?.setAttribute('y1',start?.y + start?.height +"")
                line?.setAttribute('y2',end?.y+"")
                line?.setAttribute('stroke', colors[idx])
                eng?.setAttribute('fill', colors[idx])
                jpa?.setAttribute('fill', colors[idx])
            }
    })
    }, [alignPairs, colors])
    return (
        <svg id="wordRender" viewBox="0 0 500 250" preserveAspectRatio="xMinYMin">
            <text id="jp-text" y="50" x="50%" textAnchor="middle">{jwords.map((w,idx) =>(<Fragment key={w + '-' + idx}><tspan fill="black" id={'ja-'+idx} key={idx}>{w}</tspan></Fragment>))}</text>
            <text id="eng-text" y="200" x="50%"  textAnchor="middle">{words.map((w,idx) => (<Fragment key={w + '-' + idx}><tspan fill="black" id={'eng-'+idx}>{w}</tspan>{' '}</Fragment>))}</text>
            <g>
                {alignPairs.map((w,idx) => <line stroke="black" strokeWidth="1" key={w + idx} id={'line-'+idx}/> )}
            </g>
        </svg>
    )
}
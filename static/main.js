const apiUrl = "https://basic-sensor-ifvqa.appengine.bfcplatform.vn/"


const draw = (metric_name,temperature, humidity) => {
    const colorSelector = (temp) => {
        if(!temp) return temp
        if(temp <= 25) return "green";
        if(temp <= 40) return "orange";
        return "red"
    }
    const data = [
        {
            type: "indicator",
            value: temperature,
            gauge: {axis: {visible: true, range: [0, 100]}, bar: {color: colorSelector(temperature)}},
            domain: {row: 0, column: 0}
        },
        {
            type: "indicator",
            value: humidity,
            gauge: {axis: {visible: true, range: [0, 100]}, bar: {color: "darkblue"}},
            domain: {row: 0, column: 1}
        },
    ];

    const layout = {
        width: 600,
        height: 175,
        margin: {t: 35, b: 0, l: 20, r: 40},
        grid: {rows: 1, columns: 2, pattern: "independent"},
        template: {
            data: {
                indicator: [
                    {
                        title: {text: "Nhiệt độ"},
                        mode: "number+gauge",
                    },
                    {
                        title: {text: "Độ ẩm"},
                        mode: "number+gauge",
                    }
                ]
            }
        }
    };
    Plotly.newPlot(metric_name, data, layout);
}


const updateTime = (newTime) => {
    let timestampSpan = document.getElementById("timestamp");
    timestampSpan.textContent = newTime;
}


const callAllAPI = (callback) => {
    const Allurl = [
        `${apiUrl}/api/metrics?sensor=1`,
        `${apiUrl}/api/metrics?sensor=2`,
        `${apiUrl}/api/metrics?sensor=3`
    ];
    const requests = Allurl.map(url => fetch (url));
    Promise.all(requests)
        .then(response => Promise.all(response.map(resp => resp.json())))
        .then(data => {
            const mergedData = [].concat(...data);
            console.log(mergedData);
            callback(mergedData);
        })
        .catch(error => console.log(error));
}

const main = () => {
    callAllAPI((data2) => {
        for(var i = 0; i < 3; i ++)
        {
            draw(`metric${i+1}`,data2[i].temperature_c, data2[i].humidity);
        }
        updateTime(data.timestamp)
    })
}

main()
// 1 giay update data 1 lan
setInterval(() => {
    main()
}, 1000)
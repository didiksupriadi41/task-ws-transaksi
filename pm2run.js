const { exec } = require('child_process');

var myArgs = process.argv.slice(2);

if (myArgs.length == 2) {
    var processName = myArgs[1];
    var processSource = myArgs[0];
    exec(`pm2 pid ${processName}`, function (err, stdout) {
        if (err) {
            console.log('Fail to exec pm2 pid\nError: ' + err);
            return;
        } else {
            const pid = parseInt(stdout);
            if (isNaN(pid) || pid == 0) {
                console.log(`Starting new process: ${processName}`);
                exec(`pm2 start ${processSource} --name ${processName}`, function (err) {
                    if (err) console.log('Fail to exec pm2 start\nError: ' + err);
                })
            } else {
                console.log(`Restarting process: ${processName}`);
                exec(`pm2 restart ${processName}`, function (err) {
                    if (err) console.log('Fail to exec pm2 restart\nError: ' + err);
                })
            }
        }
    })
} else {
    console.log("Please specify source and/or process name");
}
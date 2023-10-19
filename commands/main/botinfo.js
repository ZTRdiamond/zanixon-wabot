const os = require("os");
const v8 = require("v8");
const path = require("path");

module.exports = {
    name: "botinfo",
    aliases: ["botstatus","status"],
    desc: "Menampilkan informasi status bot dan lain-lain",
    type: "main",
    code: async (zanixon, m, { utils }) => {
        const used = process.memoryUsage();

        const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
            return cpu;
        });

        const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total;
            last.speed += cpu.speed / length;
            last.times.user += cpu.times.user;
            last.times.nice += cpu.times.nice;
            last.times.sys += cpu.times.sys;
            last.times.idle += cpu.times.idle;
            last.times.irq += cpu.times.irq;
            return last;
        }, {
            speed: 0,
            total: 0,
            times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0
            }
        });

        let heapStat = await v8.getHeapStatistics();

        let teks = `💻 *_Info Server_* 
*- Hostname :* ${os.hostname()} 
*- Platform :* ${os.platform()} 
*- OS :* ${os.version()} / ${os.release()} 
*- Arch :* ${os.arch()} (${os.machine()}) 
*- RAM :* ${utils.formatBytes(os.totalmem() - os.freemem())} / ${utils.formatBytes(os.totalmem())} 

*_Runtime Bot_* 
${utils.uptime().short} 

*_NodeJS Memory Usage_* 
${Object.keys(used).map((key, _, arr) => `*- ${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')} :* ${utils.formatBytes(used[key])}`).join('\n')} 
*- Heap Executable :* ${utils.formatBytes(heapStat?.total_heap_size_executable)} 
*- Physical Size :* ${utils.formatBytes(heapStat?.total_physical_size)} 
*- Available Size :* ${utils.formatBytes(heapStat?.total_available_size)} 
*- Heap Limit :* ${utils.formatBytes(heapStat?.heap_size_limit)} 
*- Malloced Memory :* ${utils.formatBytes(heapStat?.malloced_memory)} 
*- Peak Malloced Memory :* ${utils.formatBytes(heapStat?.peak_malloced_memory)} 
*- Does Zap Garbage :* ${utils.formatBytes(heapStat?.does_zap_garbage)} 
*- Native Contexts :* ${utils.formatBytes(heapStat?.number_of_native_contexts)} 
*- Detached Contexts :* ${utils.formatBytes(heapStat?.number_of_detached_contexts)} 
*- Total Global Handles :* ${utils.formatBytes(heapStat?.total_global_handles_size)} 
*- Used Global Handles :* ${utils.formatBytes(heapStat?.used_global_handles_size)} 

${cpus[0] ? `*_Total CPU Usage_* 
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `*- ${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}` : ''}`.trim();

        m.reply(teks);
    }
}

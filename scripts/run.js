
const main = async () =>{

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    })
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);


    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );

    console.log(
        "Contract balance: ",
        hre.ethers.utils.formatEther(contractBalance)
    );
    let waveTxn = await waveContract.wave("wave 1");
    await waveTxn.wait();
    let waveTxn2 = await waveContract.wave("wave 2");
    await waveTxn.wait();
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

}

const runMain = async () =>{
    try{
        await main();
        process.exit(0); //Exit node process without error
    }catch (error){
        console.log(error);
        process.exit(1); // exit Node proces while indicating 'Uncaught Fatal Exception' error
    }

}
runMain();
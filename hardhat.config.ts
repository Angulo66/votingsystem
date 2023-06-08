import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-typechain';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-gas-reporter';
import '@openzeppelin/hardhat-upgrades';

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.8.17',
  settings: {
    viaIR: true,
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 200,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
  allowUnlimitedContractSize: true,
};

const config: HardhatUserConfig = {
  paths: {
    sources: './contracts',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      chainId: 31_336,
      forking: {
        url: '',
        blockNumber: 8932578,
      },
    },
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  mocha: {
    timeout: 60000,
  },
  etherscan: {
    apiKey: '',
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 53,
    coinmarketcap: '',
  },
};

export default config;

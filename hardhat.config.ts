import '@tenderly/hardhat-tenderly'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-web3'
import '@nomiclabs/hardhat-etherscan'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'hardhat-deploy'
import 'hardhat-spdx-license-identifier'

import { HardhatUserConfig } from 'hardhat/config'
import dotenv from 'dotenv'

dotenv.config()

let config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    coverage: {
      url: 'http://127.0.0.1:8555',
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/ce8ef4b53e0c45c899ef862be05afd55',
      gasPrice: 2 * 1000000000,
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      gasPrice: 10 * 1000000000,
    },
    testnet: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/tmEmzPXw-YAGzFPxNjcYACSGIY8stGs0',
      gasPrice: 2 * 1000000000,
    },
    polygonprodtest: {
      url: 'https://polygon-mainnet.infura.io/v3/ce8ef4b53e0c45c899ef862be05afd55',
      gasPrice: 6 * 1000000000,
    },
    polygon: {
      url: 'https://polygon-mainnet.infura.io/v3/ce8ef4b53e0c45c899ef862be05afd55',
      gasPrice: 6 * 1000000000,
    },
    bsc: {
      url: 'https://bsc-dataseed1.defibit.io',
      gasPrice: 6 * 1000000000,
    },
    mainnet: {
      url: process.env.ALCHEMY_API,
      gasPrice: 55 * 1000000000,
    },
  },
  paths: {
    artifacts: './build/artifacts',
    cache: './build/cache',
  },
  typechain: {
    outDir: './build/typechain/',
    target: 'ethers-v5',
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
      {
        version: '0.8.2',
      },
      {
        version: '0.8.3',
      },
      {
        version: '0.4.24'
      }
    ],
  },
  namedAccounts: {
    deployer: {
      default: 3, // here this will by default take the first account as deployer
      1: 3, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    libraryDeployer: {
      default: 1, // use a different account for deploying libraries on the hardhat network
      1: 0, // use the same address as the main deployer on mainnet
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 21,
  },
  mocha: {
    timeout: 200000,
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
}

if (process.env.ETHERSCAN_API) {
  config = { ...config, etherscan: { apiKey: process.env.ETHERSCAN_API } }
}

if (process.env.ROPSTEN_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    testnet: {
      ...config.networks?.testnet,
      accounts: JSON.parse(process.env.ROPSTEN_PRIVATE_KEYS),
    },
  }
}

if (process.env.BSC_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    bsctestnet: {
      ...config.networks?.bsctestnet,
      accounts: JSON.parse(process.env.BSC_PRIVATE_KEYS),
    },
  }
}

if (process.env.MUMBAI_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    mumbai: {
      ...config.networks?.bsctestnet,
      accounts: JSON.parse(process.env.MUMBAI_PRIVATE_KEYS),
    },
  }
}

if (process.env.POLYGONPRODTEST_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    polygonprodtest: {
      ...config.networks?.polygonprodtest,
      accounts: JSON.parse(process.env.POLYGONPRODTEST_PRIVATE_KEYS),
    },
  }
}

if (process.env.POLYGON_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    polygon: {
      ...config.networks?.polygon,
      accounts: JSON.parse(process.env.POLYGON_PRIVATE_KEYS),
    },
  }
}

if (process.env.BSC_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    bsc: {
      ...config.networks?.bsc,
      accounts: JSON.parse(process.env.BSC_PRIVATE_KEYS),
    },
  }
}

if (process.env.ACCOUNT_PRIVATE_KEYS) {
  config.networks = {
    ...config.networks,
    mainnet: {
      ...config.networks?.mainnet,
      accounts: JSON.parse(process.env.ACCOUNT_PRIVATE_KEYS),
    },
  }
}

module.exports = config

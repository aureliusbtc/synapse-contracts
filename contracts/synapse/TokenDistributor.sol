// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract TokenDistributor is Ownable {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  IERC20 public immutable token;
  bool isClaimable = false;

  mapping(address => uint256) public claimBalances;

  constructor(IERC20 _token) public {
    token = _token;
  }

  function enableClaim() external onlyOwner {
    isClaimable = true;
  }

  function setClaimBalances(
    address[] calldata addresses,
    uint256[] calldata amounts
  ) external onlyOwner {
    for (uint256 i = 0; i < addresses.length; ++i) {
      claimBalances[addresses[i]] = amounts[i];
    }
  }

  function claim(address sender) external {
    require(isClaimable, 'Claim not enabled');
    require(msg.sender == sender, 'Incorrect address claim');
    uint256 claimAmount = claimBalances[msg.sender];
    require(claimAmount != 0, "Claim can't be zero");
    token.safeTransfer(msg.sender, claimAmount);
    claimBalances[msg.sender] = 0;
  }
}
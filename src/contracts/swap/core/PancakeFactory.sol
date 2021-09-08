// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './interfaces/IPancakeFactory.sol';
import './PancakePair.sol';

contract PancakeFactory is IPancakeFactory {
    bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(PancakePair).creationCode));

    address public _feeTo;
    address public _feeToSetter;

    mapping(address => mapping(address => address)) public _getPair;
    address[] public _allPairs;

    //event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address feeToSetter_) {
        _feeToSetter = feeToSetter_;
    }

    function feeTo() external view override returns (address) {
      return _feeTo;
    }

    function feeToSetter() external view override returns (address) {
      return _feeToSetter;
    }

    function getPair(address tokenA, address tokenB) external view  override returns (address pair) {
      return _getPair[tokenA][tokenB];
    }

    function allPairs(uint i) external view override returns (address pair) {
      return _allPairs[i];
    }

    function allPairsLength() external view override returns (uint) {
        return _allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external override returns (address pair) {
        require(tokenA != tokenB, 'Pancake: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'Pancake: ZERO_ADDRESS');
        require(_getPair[token0][token1] == address(0), 'Pancake: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(PancakePair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IPancakePair(pair).initialize(token0, token1);
        _getPair[token0][token1] = pair;
        _getPair[token1][token0] = pair; // populate mapping in the reverse direction
        _allPairs.push(pair);
        emit PairCreated(token0, token1, pair, _allPairs.length);
    }

    function setFeeTo(address feeTo_) external override {
        require(msg.sender == _feeToSetter, 'Pancake: FORBIDDEN');
        _feeTo = feeTo_;
    }

    function setFeeToSetter(address feeToSetter_) external override {
        require(msg.sender == _feeToSetter, 'Pancake: FORBIDDEN');
        _feeToSetter = feeToSetter_;
    }
}

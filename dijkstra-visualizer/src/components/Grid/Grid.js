import React, { useEffect, useState } from 'react';
import './Grid.css';
import { dijkstra, getNodesInShortestPathOrder } from '../Dijkstra/dijkstra';

const Grid = ({ rows, columns }) => {
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 10, col: 5 });
  const [end, setEnd] = useState({ row: 12, col: 20 });
  const [path, setPath] = useState([]);

  useEffect(() => {
    const initialGrid = initializeGrid(rows, columns, start, end);
    setGrid(initialGrid);
  }, [rows, columns, start, end]);

  useEffect(() => {
    if (grid.length > 0) {
      const startNode = grid[start.row][start.col];
      const endNode = grid[end.row][end.col];
      const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
      const shortestPath = getNodesInShortestPathOrder(endNode);
      animateDijkstra(visitedNodesInOrder, shortestPath);
    }
  }, [grid]);

  const initializeGrid = (rows, columns, startNode, endNode) => {
    let initialGrid = [];
    for (let row = 0; row < rows; row++) {
      let currRow = [];
      for (let col = 0; col < columns; col++) {
        let cellClass = 'cell';
        if (row === startNode.row && col === startNode.col) {
          cellClass += ' start';
        } else if (row === endNode.row && col === endNode.col) {
          cellClass += ' end';
        }
        currRow.push({ row, col, className: cellClass, distance: Infinity, isVisited: false, previousNode: null });
      }
      initialGrid.push(currRow);
    }
    return initialGrid;
  };

  const animateDijkstra = (visitedNodesInOrder, shortestPath) => {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!(node.row == end.row && node.col === end.col)){
          document.getElementById(`node-${node.row}-${node.col}`).className = 'cell visited';
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 1; i < nodesInShortestPathOrder.length -1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'cell path';
      }, 50 * i);
    }
  };

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((node, nodeIdx) => {
            const { row, col, className } = node;
            return (
              <div
                key={nodeIdx}
                id={`node-${row}-${col}`}
                className={className}
              >
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
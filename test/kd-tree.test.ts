import KDTree from '../src/index';
import KDNode from '../src/kdNode';
import { Point2D } from '../src/types/point2d';
import distance from '../src/tools/distance';

describe('Insertion test', () => {
  let tree: KDTree;
  beforeEach(() => {
    tree = new KDTree();
  });
  it('should return node', () => {
    const point: Point2D = [7, 8];
    const points: Array<Point2D> = [
      [30, 40],
      [5, 25],
      [10, 12],
      [70, 70],
      [50, 30],
      [35, 45],
    ];
    points.forEach(point => tree.insert(point));

    expect(tree.insert(point) instanceof KDNode);
  });
});

describe('Calc distance', () => {
  it('should return distance', () => {
    const [a, b, c, d]: Array<Point2D> = [
      [2, 2],
      [6, 5],
      [3, -1],
      [6, 3],
    ];
    expect(distance(a, b)).toEqual(5);
    expect(distance(c, d)).toEqual(5);
  });
});

describe('Find nearest neighbor', () => {
  let tree: KDTree;
  beforeEach(() => {
    tree = new KDTree();
  });
  it('should return null if tree is empty', () => {
    expect(tree.nearestNeighbor([5, 7])).toBe(null);
  });
  it('should return root if there is only one node', () => {
    tree.insert([100000, 1000000]);
    expect(tree.nearestNeighbor([5, 7])).toEqual([100000, 1000000]);
  });
  it('should return node with nearest neighbor', () => {
    const points: Array<Point2D> = [
      [6, 5],
      [3, 6],
      [9, 4],
      [2, 3],
      [4, 8],
      [7, 2],
      [8, 7],
    ];
    points.forEach(point => tree.insert(point));
    expect(tree.nearestNeighbor([9, 8])).toEqual([8, 7]);
    expect(tree.nearestNeighbor([5, 5])).toEqual([6, 5]);
    expect(tree.nearestNeighbor([7, 5])).toEqual([6, 5]);
    expect(tree.nearestNeighbor([6, 8])).toEqual([4, 8]);
  });
  it('should return node with nearest neighbor from unbalanced tree', () => {
    const points: Array<Point2D> = [
      [1, 5],
      [2, 7],
      [3, 8],
      [4, 9],
      [5, 10],
      [6, 11],
      [7, 12],
      [8, 13],
      [9, 14],
    ];
    points.forEach(point => tree.insert(point));
    expect(tree.nearestNeighbor([4, 11])).toEqual([5, 10]);
    expect(tree.nearestNeighbor([2, 6])).toEqual([2, 7]);
    expect(tree.nearestNeighbor([-1, 0])).toEqual([1, 5]);
  });
});

import ImageInterface from "../interfaces/image.interface";
import {ImageGridDao} from "../model/image-grid-dao";
class ImageGridController {
    
  /**
   * get saved grid
   * @returns image list
   */
  getGrid = async (): Promise<ImageInterface[]> => {
    const grid = await ImageGridDao.find();
    console.log("GRIDDDD ",grid);
    return grid;
  };

    /**
   * Create the grid
   * @param data
   * @returns created grid
   */
     createGrid = async (
      data: ImageInterface []
    ): Promise<ImageInterface [] | Boolean> => {
      try {
        let finalGrid : ImageInterface [] = [];
        data.forEach(async element => {
          const gridDao = new ImageGridDao(element);
        const gridImage = await gridDao.save();
        console.log("gridImage",gridImage);
        finalGrid.push(gridImage);
        });
        return finalGrid;
      } catch (err) {
        return false;
      }
    };
}

export default new ImageGridController();

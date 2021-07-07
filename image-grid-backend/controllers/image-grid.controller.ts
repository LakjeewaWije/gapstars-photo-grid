import GridInterface from "../interfaces/grid.interface";
import ImageInterface from "../interfaces/image.interface";
import { ImageGridDao } from "../model/image-grid-dao";
class ImageGridController {
  /**
   * get saved grid
   * @returns image list
   */
  getGrid = async (): Promise<GridInterface> => {
    const gridImages = await ImageGridDao.find();
    return gridImages[0];
  };

  /**
   * Create the grid
   * @param data
   * @returns created grid
   */
  createGrid = async (
    data: GridInterface
  ): Promise<GridInterface | Boolean> => {
    try {
      await ImageGridDao.remove();
      try{
        const gridDao = new ImageGridDao(data);
        const gridImage = await gridDao.save();
        return gridImage;
      }catch(err){
        return false;
      }
      
    } catch (err) {
      return false;
    }
  };
}

export default new ImageGridController();

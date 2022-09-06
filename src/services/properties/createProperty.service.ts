import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";
import { Properties } from "../../entities/properties.entity";
import { Address } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";

const createPropertyService = async (property: IPropertyRequest): Promise<Properties> => {
  
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const addressesRepository = AppDataSource.getRepository(Address);
  const categoriesRepository = AppDataSource.getRepository(Categories);
  
  const { address, categoryId, size, value } = property

  if (address.state.length > 2) {
    throw new AppError("Invalid state", 400);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Invalid zip code", 400);
  }

  const newAddress = addressesRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state
  });

  await addressesRepository.save(newAddress);

  const category = await categoriesRepository.findOneBy({id: property.categoryId});
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  
  const propertyAlreadyExists = await propertiesRepository.find({where: {address: property.address}});
  if (propertyAlreadyExists.length > 0) {
    throw new AppError("Address already exists", 400);
  }

  const newProperty = propertiesRepository.create({
    value: property.value,
    size: property.size,
    address: newAddress,
    category,
  });

  await propertiesRepository.save(newProperty);
  return newProperty;
};

export default createPropertyService;

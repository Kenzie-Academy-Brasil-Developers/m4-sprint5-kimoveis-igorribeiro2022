import { IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import * as bcrypt from "bcryptjs";

const createUserService = async ({ name, email, password, isAdm}: IUserRequest) => {
  const usersRepository = AppDataSource.getRepository(Users);

  const userExist = await usersRepository.findOneBy({email: email});
  
  if (userExist) {
    throw new Error("Email already exists!");
  }
  
  const hashedPass = await bcrypt.hash(password, 10);
  
  const newUser = {
    name,
    email,
    password: hashedPass,
    isAdm,
  }
  
  const user = usersRepository.create(newUser)
  
  await usersRepository.save(user);
  
  const userCreated = await usersRepository.findOneBy({email: email});
  return userCreated;
};

export default createUserService;

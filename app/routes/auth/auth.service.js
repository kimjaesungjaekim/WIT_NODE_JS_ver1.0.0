import bcrypt from "bcryptjs";
import prisma from "../../prisma/prisma-client.js";
import HttpException from "../../models/http-exception.model.js";
import generateToken from "./token.utils.js";

const checkUserUniqueness = async (email, username) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  const existingUserByUsername = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  if (existingUserByEmail || existingUserByUsername) {
    throw new HttpException(422, {
      errors: {
        ...(existingUserByEmail ? { email: ["has already been taken"] } : {}),
        ...(existingUserByUsername
          ? { username: ["has already been taken"] }
          : {}),
      },
    });
  }
};

export const createUser = async (input) => {
  const EMAIL = input.email?.trim();
  const PW = input.pw?.trim();
  const FRST_NM = input.frstNm?.trim(); 
  const LAST_NM = input.lastNm?.trim();
  const NC_NM = input.ncNm?.trim();
  const BRDT = input.brdt?.trim();
  const POINT = input.point;
  const GNDR = input.gndr?.trim();
  const APRV_YN = input.aprvYn?.trim(); 
  const CRT_DT = new Date(); 
  const SC_TY = input.scTy?.trim();
  const WHDWL_YN = input.whdwlYn?.trim();
  if (!EMAIL) {
    throw new HttpException(422, { errors: { EMAIL: ["can't be blank"] } });
  }
  if (!PW) {
    throw new HttpException(422, { errors: { PW: ["can't be blank"] } });
  }


  const hashedPassword = await bcrypt.hash(PW, 10);

  const member = await prisma.mBR_TB.create({
    data: {
      EMAIL,
      PW :hashedPassword,
      FRST_NM,
      LAST_NM,
      NC_NM,
      BRDT,
      POINT,
      GNDR,
      APRV_YN,
      CRT_DT,
      SC_TY,
      WHDWL_YN
    },
  });

  return member
};

export const login = async (userPayload) => {
  const email = userPayload.email?.trim();
  const password = userPayload.password?.trim();

  if (!email) {
    throw new HttpException(422, { errors: { email: ["can't be blank"] } });
  }

  if (!password) {
    throw new HttpException(422, { errors: { password: ["can't be blank"] } });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      password: true,
      bio: true,
      image: true,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return {
        email: user.email,
        username: user.username,
        bio: user.bio,
        image: user.image,
        token: generateToken(user.id),
      };
    }
  }

  throw new HttpException(403, {
    errors: {
      "email or password": ["is invalid"],
    },
  });
};

export const getCurrentUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      bio: true,
      image: true,
    },
  });

  return {
    ...user,
    token: generateToken(user.id),
  };
};

export const updateUser = async (userPayload, id) => {
  const { email, username, password, image, bio } = userPayload;
  let hashedPassword;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...(email ? { email } : {}),
      ...(username ? { username } : {}),
      ...(password ? { password: hashedPassword } : {}),
      ...(image ? { image } : {}),
      ...(bio ? { bio } : {}),
    },
    select: {
      id: true,
      email: true,
      username: true,
      bio: true,
      image: true,
    },
  });

  return {
    ...user,
    token: generateToken(user.id),
  };
};

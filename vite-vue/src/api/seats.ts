import axios from 'axios';

// 座位类型定义
export interface Seat {
  id: number;
  number: string; // 座位编号，如 "1-2" 表示第1排第2列
  status: 'available' | 'occupied' | 'disabled'; // 座位状态
  position: { row: number; col: number }; // 座位位置
}

// 阅览室类型定义
export interface ReadingRoom {
  id: number;
  name: string; // 阅览室名称
  capacity: number; // 座位容量
  floor: number; // 所在楼层
  description?: string; // 描述信息
  openTime?: string; // 开放时间
  closeTime?: string; // 关闭时间
}

// 预约类型定义
export interface Reservation {
  id: number;
  userId: number; // 用户ID
  seatId: number; // 座位ID
  roomId: number; // 阅览室ID
  date: string; // 预约日期，格式：YYYY-MM-DD
  timeSlot: string; // 时间段：morning, afternoon, evening, fullday
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'; // 预约状态
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
}

// 座位查询参数
export interface SeatQueryParams {
  roomId: number; // 阅览室ID
  date: string; // 日期，格式：YYYY-MM-DD
  timeSlot: string; // 时间段：morning, afternoon, evening, fullday
}

// 获取所有阅览室
export const getReadingRooms = async () => {
  try {
    // 实际API调用
    // return await axios.get('/api/reading-rooms');
    
    // 模拟数据
    return {
      data: [
        { id: 1, name: '一楼自习室', capacity: 100, floor: 1, description: '安静舒适的学习环境', openTime: '08:00', closeTime: '22:00' },
        { id: 2, name: '二楼电子阅览室', capacity: 80, floor: 2, description: '配备电脑的阅览室', openTime: '08:00', closeTime: '22:00' },
        { id: 3, name: '三楼研修室', capacity: 60, floor: 3, description: '适合小组讨论', openTime: '08:00', closeTime: '22:00' },
        { id: 4, name: '四楼静音区', capacity: 120, floor: 4, description: '绝对安静的学习区域', openTime: '08:00', closeTime: '22:00' }
      ]
    };
  } catch (error) {
    console.error('获取阅览室列表失败:', error);
    throw error;
  }
};

// 获取可用座位
export const getAvailableSeats = async (params: SeatQueryParams) => {
  try {
    // 实际API调用
    // return await axios.get('/api/seats/available', { params });
    
    // 模拟数据 - 实际应从后端获取
    // 这里仅作为前端开发阶段的模拟数据
    const mockSeats = [];
    const totalSeats = 60; // 总座位数
    const rows = 6;
    const cols = 10;
    
    for (let i = 1; i <= totalSeats; i++) {
      const row = Math.ceil(i / cols);
      const col = i % cols === 0 ? cols : i % cols;
      
      // 随机生成座位状态
      const randomStatus = Math.random();
      let status: 'available' | 'occupied' | 'disabled';
      
      if (randomStatus < 0.6) {
        status = 'available';
      } else if (randomStatus < 0.9) {
        status = 'occupied';
      } else {
        status = 'disabled';
      }
      
      mockSeats.push({
        id: i,
        number: `${row}-${col}`,
        status,
        position: { row, col }
      });
    }
    
    return { data: mockSeats };
  } catch (error) {
    console.error('获取可用座位失败:', error);
    throw error;
  }
};

// 创建座位预约
export const createReservation = async (data: {
  seatId: number;
  roomId: number;
  date: string;
  timeSlot: string;
}) => {
  try {
    // 实际API调用
    // return await axios.post('/api/reservations', data);
    
    // 模拟成功响应
    return {
      data: {
        id: Math.floor(Math.random() * 1000),
        userId: 1, // 假设当前用户ID为1
        seatId: data.seatId,
        roomId: data.roomId,
        date: data.date,
        timeSlot: data.timeSlot,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('创建座位预约失败:', error);
    throw error;
  }
};

// 获取用户的预约列表
export const getUserReservations = async () => {
  try {
    // 实际API调用
    // return await axios.get('/api/user/reservations');
    
    // 模拟数据
    return {
      data: [
        {
          id: 1,
          userId: 1,
          seatId: 15,
          roomId: 1,
          date: '2023-06-15',
          timeSlot: 'morning',
          status: 'confirmed',
          createdAt: '2023-06-10T08:30:00Z',
          updatedAt: '2023-06-10T08:30:00Z',
          seat: { number: '2-5' },
          room: { name: '一楼自习室' }
        },
        {
          id: 2,
          userId: 1,
          seatId: 42,
          roomId: 3,
          date: '2023-06-16',
          timeSlot: 'afternoon',
          status: 'confirmed',
          createdAt: '2023-06-11T14:20:00Z',
          updatedAt: '2023-06-11T14:20:00Z',
          seat: { number: '4-2' },
          room: { name: '三楼研修室' }
        }
      ]
    };
  } catch (error) {
    console.error('获取用户预约列表失败:', error);
    throw error;
  }
};

// 取消预约
export const cancelReservation = async (reservationId: number) => {
  try {
    // 实际API调用
    // return await axios.put(`/api/reservations/${reservationId}/cancel`);
    
    // 模拟成功响应
    return {
      data: {
        success: true,
        message: '预约已成功取消'
      }
    };
  } catch (error) {
    console.error('取消预约失败:', error);
    throw error;
  }
};
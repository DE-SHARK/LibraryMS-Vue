<template>
  <div :class="style.seatReservationContainer">
    <!-- 顶部导航栏 -->
    <app-header></app-header>

    <!-- 主要内容区域 -->
    <main :class="style.mainContent">
      <div :class="style.seatReservationSection">
        <h1 :class="style.pageTitle">座位预约</h1>
        
        <!-- 预约筛选区域 -->
        <div :class="style.filterSection">
          <el-form :model="filterForm" label-position="top" :class="style.filterForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="选择日期">
                  <el-date-picker
                    v-model="filterForm.date"
                    type="date"
                    placeholder="选择预约日期"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    :disabled-date="disabledDate"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择时间段">
                  <el-select v-model="filterForm.timeSlot" placeholder="选择时间段" style="width: 100%">
                    <el-option v-for="slot in timeSlots" :key="slot.value" :label="slot.label" :value="slot.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="选择阅览室">
                  <el-select v-model="filterForm.roomId" placeholder="选择阅览室" style="width: 100%">
                    <el-option v-for="room in readingRooms" :key="room.id" :label="room.name" :value="room.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :class="style.searchBtnCol">
                <el-button type="primary" :icon="Search" @click="searchAvailableSeats">查询可用座位</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!-- 座位图例说明 -->
        <div :class="style.legendSection">
          <div :class="style.legendItem">
            <div :class="[style.legendBox, style.available]"></div>
            <span>可预约</span>
          </div>
          <div :class="style.legendItem">
            <div :class="[style.legendBox, style.occupied]"></div>
            <span>已占用</span>
          </div>
          <div :class="style.legendItem">
            <div :class="[style.legendBox, style.selected]"></div>
            <span>已选择</span>
          </div>
          <div :class="style.legendItem">
            <div :class="[style.legendBox, style.disabled]"></div>
            <span>不可用</span>
          </div>
        </div>

        <!-- 座位布局区域 -->
        <div :class="style.seatMapContainer">
          <div v-if="loading" :class="style.loadingContainer">
            <el-skeleton :rows="10" animated />
          </div>
          <div v-else-if="!hasSearched" :class="style.emptyStateContainer">
            <el-empty description="请选择日期、时间段和阅览室进行查询" />
          </div>
          <div v-else-if="seats.length === 0" :class="style.emptyStateContainer">
            <el-empty description="未找到可用座位" />
          </div>
          <div v-else :class="style.seatMapWrapper">
            <h2 :class="style.sectionTitle">{{ selectedRoom?.name || '阅览室' }}座位图</h2>
            
            <!-- 座位网格 -->
            <div :class="style.seatGrid">
              <div 
                v-for="seat in seats" 
                :key="seat.id"
                :class="[
                  style.seatItem,
                  { 
                    [style.available]: seat.status === 'available',
                    [style.occupied]: seat.status === 'occupied',
                    [style.disabled]: seat.status === 'disabled',
                    [style.selected]: selectedSeatId === seat.id
                  }
                ]"
                @click="selectSeat(seat)"
              >
                <span :class="style.seatNumber">{{ seat.number }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 预约信息区域 -->
        <div v-if="selectedSeatId" :class="style.reservationInfoSection">
          <h2 :class="style.sectionTitle">预约信息</h2>
          <div :class="style.reservationDetails">
            <div :class="style.detailItem">
              <span :class="style.detailLabel">阅览室:</span>
              <span :class="style.detailValue">{{ selectedRoom?.name }}</span>
            </div>
            <div :class="style.detailItem">
              <span :class="style.detailLabel">座位号:</span>
              <span :class="style.detailValue">{{ selectedSeat?.number }}</span>
            </div>
            <div :class="style.detailItem">
              <span :class="style.detailLabel">日期:</span>
              <span :class="style.detailValue">{{ filterForm.date }}</span>
            </div>
            <div :class="style.detailItem">
              <span :class="style.detailLabel">时间段:</span>
              <span :class="style.detailValue">{{ getTimeSlotLabel(filterForm.timeSlot) }}</span>
            </div>
          </div>
          <div :class="style.actionButtons">
            <el-button type="primary" @click="confirmReservation">确认预约</el-button>
            <el-button @click="cancelSelection">取消选择</el-button>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <app-footer></app-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { useCssModule } from 'vue';
import { ElMessage } from 'element-plus';

import AppFooter from "@/components/common/app-footer.vue";
import AppHeader from "@/components/common/app-header.vue";

// 定义组件名称
defineComponent({
  name: 'SeatReservation'
});

// 获取 CSS Modules 样式
const style = useCssModule();

// 路由
const router = useRouter();

// 阅览室数据
const readingRooms = ref([
  { id: 1, name: '一楼自习室' },
  { id: 2, name: '二楼电子阅览室' },
  { id: 3, name: '三楼研修室' },
  { id: 4, name: '四楼静音区' }
]);

// 时间段选项
const timeSlots = [
  { value: 'morning', label: '上午 (8:00-12:00)' },
  { value: 'afternoon', label: '下午 (14:00-18:00)' },
  { value: 'evening', label: '晚上 (19:00-22:00)' },
  { value: 'fullday', label: '全天 (8:00-22:00)' }
];

// 筛选表单
const filterForm = ref({
  date: new Date().toISOString().split('T')[0], // 默认今天
  timeSlot: 'morning',
  roomId: 1
});

// 座位数据
const seats = ref<Array<{
  id: number;
  number: string;
  status: 'available' | 'occupied' | 'disabled';
  position: { row: number; col: number };
}>>([]);

// 状态变量
const loading = ref(false);
const hasSearched = ref(false);
const selectedSeatId = ref<number | null>(null);

// 计算属性
const selectedRoom = computed(() => {
  return readingRooms.value.find(room => room.id === filterForm.value.roomId);
});

const selectedSeat = computed(() => {
  if (!selectedSeatId.value) return null;
  return seats.value.find(seat => seat.id === selectedSeatId.value);
});

// 禁用过去的日期
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 8.64e7; // 禁用今天之前的日期
};

// 获取时间段标签
const getTimeSlotLabel = (value: string) => {
  const slot = timeSlots.find(slot => slot.value === value);
  return slot ? slot.label : value;
};

// 查询可用座位
const searchAvailableSeats = async () => {
  loading.value = true;
  hasSearched.value = true;
  selectedSeatId.value = null;
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 生成模拟座位数据
    const mockSeats = [];
    const totalSeats = 60; // 总座位数
    const rows = 6;
    const cols = 10;
    
    for (let i = 1; i <= totalSeats; i++) {
      const row = Math.ceil(i / cols);
      const col = i % cols === 0 ? cols : i % cols;
      
      // 随机生成座位状态，实际应从API获取
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
    
    seats.value = mockSeats;
  } catch (error) {
    console.error('获取座位信息失败:', error);
    ElMessage.error('获取座位信息失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 选择座位
const selectSeat = (seat: typeof seats.value[0]) => {
  if (seat.status !== 'available') {
    if (seat.status === 'occupied') {
      ElMessage.warning('该座位已被预约');
    } else if (seat.status === 'disabled') {
      ElMessage.warning('该座位不可用');
    }
    return;
  }
  
  selectedSeatId.value = seat.id;
};

// 取消选择
const cancelSelection = () => {
  selectedSeatId.value = null;
};

// 确认预约
const confirmReservation = async () => {
  if (!selectedSeatId.value) {
    ElMessage.warning('请先选择一个座位');
    return;
  }
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800));
    
    ElMessage.success('座位预约成功！');
    // 预约成功后可以跳转到预约详情页或个人中心
    router.push('/profile/reservation');
  } catch (error) {
    console.error('座位预约失败:', error);
    ElMessage.error('座位预约失败，请稍后重试');
  }
};

// 组件挂载时执行
onMounted(() => {
  // 可以在这里加载初始数据
});
</script>

<style lang="scss" module>
@use './seat-reservation.module.scss';
</style>
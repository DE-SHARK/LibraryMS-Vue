<template>
  <div :class="style.commentsContainer">
    <h2 :class="style.commentsTitle">读者评论</h2>
    
    <!-- 评论列表 -->
    <div :class="style.commentsList" v-if="comments.length > 0">
      <div 
        v-for="comment in comments" 
        :key="comment.id" 
        :class="style.commentItem"
      >
        <div :class="style.commentHeader">
          <div :class="style.userAvatar">
            {{ comment.userName.charAt(0).toUpperCase() }}
          </div>
          <div :class="style.userInfo">
            <div :class="style.userName">{{ comment.userName }}</div>
            <div :class="style.commentTime">{{ formatDate(comment.createdAt) }}</div>
          </div>
        </div>
        <div :class="style.commentContent">
          {{ comment.content }}
        </div>
      </div>
    </div>
    
    <!-- 无评论提示 -->
    <div :class="style.noComments" v-else>
      暂无评论，成为第一个评论的读者吧！
    </div>
    
    <!-- 评论表单 -->
    <div :class="style.commentForm">
      <h3 :class="style.formTitle">发表评论</h3>
      <el-form :model="commentForm" ref="formRef" :rules="rules">
        <el-form-item prop="content">
          <el-input
            v-model="commentForm.content"
            type="textarea"
            :rows="4"
            placeholder="分享您对这本书的看法..."
          />
        </el-form-item>
        <div :class="style.formActions">
          <el-button 
            :class="style.submitButton" 
            type="primary" 
            @click="submitComment"
            :loading="submitting"
          >
            发表评论
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent, defineProps, defineEmits } from 'vue';
import { useCssModule } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

// 定义组件名称
defineComponent({
  name: 'BookComments'
});

// 定义Props
interface Props {
  bookIsbn: string;
}

const props = defineProps<Props>();

// 定义事件
const emit = defineEmits<{
  (e: 'comment-added'): void;
}>();

// 获取CSS Modules样式
const style = useCssModule();

// 评论表单引用
const formRef = ref<FormInstance>();

// 表单验证规则
const rules = ref<FormRules>({
  content: [
    { required: true, message: '请输入评论内容', trigger: 'blur' },
    { min: 5, max: 500, message: '评论长度应在5到500个字符之间', trigger: 'blur' }
  ]
});

// 评论表单数据
const commentForm = ref({
  content: ''
});

// 提交状态
const submitting = ref(false);

// 评论数据类型定义
interface Comment {
  id: number;
  bookIsbn: string;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
}

// 评论列表数据
const comments = ref<Comment[]>([]);

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 获取评论列表
const fetchComments = async () => {
  try {
    // 这里应该调用API获取评论列表
    // const response = await getBookComments(props.bookIsbn);
    // comments.value = response.data;
    
    // 模拟数据
    setTimeout(() => {
      comments.value = [
        {
          id: 1,
          bookIsbn: props.bookIsbn,
          userId: 101,
          userName: '张三',
          content: '这本书非常精彩，内容深入浅出，是一本不可多得的好书！强烈推荐给所有对这个领域感兴趣的读者。',
          createdAt: '2023-05-15T14:30:00'
        },
        {
          id: 2,
          bookIsbn: props.bookIsbn,
          userId: 102,
          userName: '李四',
          content: '作者的观点很有启发性，但有些章节内容稍显冗长。总体来说值得一读。',
          createdAt: '2023-06-20T09:15:00'
        },
        {
          id: 3,
          bookIsbn: props.bookIsbn,
          userId: 103,
          userName: '王五',
          content: '这是我读过的最好的一本关于这个主题的书，逻辑清晰，案例丰富。',
          createdAt: '2023-07-05T18:45:00'
        }
      ];
    }, 500);
  } catch (error) {
    console.error('获取评论失败:', error);
    ElMessage.error('获取评论失败，请稍后重试');
  }
};

// 提交评论
const submitComment = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true;
      
      try {
        // 这里应该调用API提交评论
        // const response = await addBookComment({
        //   bookIsbn: props.bookIsbn,
        //   content: commentForm.value.content
        // });
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模拟新评论
        const newComment: Comment = {
          id: Date.now(),
          bookIsbn: props.bookIsbn,
          userId: 100, // 假设当前用户ID
          userName: '当前用户', // 假设当前用户名
          content: commentForm.value.content,
          createdAt: new Date().toISOString()
        };
        
        // 添加到评论列表
        comments.value.unshift(newComment);
        
        // 重置表单
        commentForm.value.content = '';
        formRef.value.resetFields();
        
        // 通知父组件
        emit('comment-added');
        
        ElMessage.success('评论发表成功');
      } catch (error) {
        console.error('提交评论失败:', error);
        ElMessage.error('提交评论失败，请稍后重试');
      } finally {
        submitting.value = false;
      }
    }
  });
};

// 组件挂载时获取评论列表
onMounted(() => {
  fetchComments();
});
</script>

<style lang="scss" module>
@use './book-comments.module.scss';
</style>
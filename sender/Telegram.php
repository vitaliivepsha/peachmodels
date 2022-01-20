<?php

class Telegram
{
    const TELEGRAM_BOT_TOKEN = '1181102248:AAGEJnLUtlaEHZRWVOgK7LsZ6BL4yxnclA8';

    const TELEGRAM_CHAT_ID = '-1001446229588';

    /**
     * @param $message
     */
    public function sendMessage($message)
    {
        if (empty(self::TELEGRAM_BOT_TOKEN) || empty(self::TELEGRAM_CHAT_ID)) {
            return;
        }

        $url = 'https://api.telegram.org/bot' . self::TELEGRAM_BOT_TOKEN . '/sendMessage';

        $data = [
            'chat_id' => self::TELEGRAM_CHAT_ID,
            'text' => $message,
            'parse_mode' => 'HTML',
        ];

        $result = $this->sendAPIRequest($url, $data);

        file_put_contents('logs/'.date('Y-m-d H:i:s').'.txt', print_r($data, true).PHP_EOL.print_r($result, true));

        return $result;
    }

    /**
     * @param $url
     * @param array $content
     * @param bool $post
     * @return bool|false|string
     */
    private function sendAPIRequest($url, array $content, $post = true)
    {
        if (isset($content['chat_id'])) {
            $url = $url . '?chat_id=' . $content['chat_id'];
            unset($content['chat_id']);
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if ($post) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        }
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        if ($result === false) {
            $result = json_encode(['ok' => false, 'curl_error_code' => curl_errno($ch), 'curl_error' => curl_error($ch)]);
        }
        curl_close($ch);
    }
}
